/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xroayfbnlfmvsvijbrkk.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhyb2F5ZmJubGZtdnN2aWpicmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxMTczMjEsImV4cCI6MjA4NzY5MzMyMX0.iyphNgXhmx4_0UdGtkY9oKTlmHcQLbT5Id6vKaINikg",
  },
};

export default nextConfig;
