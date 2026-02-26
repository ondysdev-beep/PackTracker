export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface NotificationSettings {
  id: string;
  userId: string;
  shipmentId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  phoneNumber: string | null;
}

export interface ApiKey {
  id: string;
  userId: string;
  keyHash: string;
  label: string | null;
  createdAt: string;
  lastUsedAt: string | null;
  requestsThisMonth: number;
}
