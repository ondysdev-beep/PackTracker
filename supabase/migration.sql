-- TrackFlow Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  tracking_number TEXT NOT NULL,
  carrier_code TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_updated TIMESTAMPTZ,
  current_status TEXT,
  raw_events JSONB,
  ai_summary TEXT,
  estimated_delivery TIMESTAMPTZ
);

-- Notification settings table
CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  email BOOLEAN DEFAULT true,
  sms BOOLEAN DEFAULT false,
  push BOOLEAN DEFAULT false,
  phone_number TEXT
);

-- Shops table (white-label)
CREATE TABLE IF NOT EXISTS shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#4fffb0',
  domain TEXT
);

-- API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ,
  requests_this_month INTEGER DEFAULT 0
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ,
  location TEXT,
  status_code TEXT,
  description_raw TEXT,
  description_human TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shipments_user_id ON shipments(user_id);
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipments_current_status ON shipments(current_status);
CREATE INDEX IF NOT EXISTS idx_events_shipment_id ON events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_notification_settings_user_id ON notification_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_settings_shipment_id ON notification_settings(shipment_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_shops_slug ON shops(slug);
CREATE INDEX IF NOT EXISTS idx_shops_owner ON shops(owner_user_id);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Users: users can only read/update their own row
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Shipments: users can CRUD their own, anonymous shipments readable by anyone
CREATE POLICY "Users can view own shipments" ON shipments
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert shipments" ON shipments
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update own shipments" ON shipments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own shipments" ON shipments
  FOR DELETE USING (auth.uid() = user_id);

-- Notification settings: users can CRUD their own
CREATE POLICY "Users can view own notifications" ON notification_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert notifications" ON notification_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notification_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON notification_settings
  FOR DELETE USING (auth.uid() = user_id);

-- Shops: owners can CRUD, anyone can read
CREATE POLICY "Anyone can view shops" ON shops
  FOR SELECT USING (true);

CREATE POLICY "Owners can insert shops" ON shops
  FOR INSERT WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Owners can update own shops" ON shops
  FOR UPDATE USING (auth.uid() = owner_user_id);

CREATE POLICY "Owners can delete own shops" ON shops
  FOR DELETE USING (auth.uid() = owner_user_id);

-- API keys: users can CRUD their own
CREATE POLICY "Users can view own API keys" ON api_keys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert API keys" ON api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own API keys" ON api_keys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own API keys" ON api_keys
  FOR DELETE USING (auth.uid() = user_id);

-- Events: readable if user owns the shipment or shipment is anonymous
CREATE POLICY "Users can view events" ON events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM shipments
      WHERE shipments.id = events.shipment_id
      AND (shipments.user_id = auth.uid() OR shipments.user_id IS NULL)
    )
  );

CREATE POLICY "Service can insert events" ON events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service can delete events" ON events
  FOR DELETE USING (true);

-- Function to auto-create user row on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create user row
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
