export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  email: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
}

export interface Pricing {
  id: string;
  game_type: string;
  h1_base: number;
  h3_base: number;
  h5_base: number;
  weekend_multiplier: number;
  updated_at: string;
}

export interface Booking {
  id: string;
  date: string;
  time_slot: string;
  console_type: string;
  customer_name: string;
  customer_phone: string;
  profile_id: string | null;
  duration_hours: number;
  total_price: number | null;
  created_at: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time_slot: string;
  console_type: string;
  reason: string | null;
  created_at: string;
}

