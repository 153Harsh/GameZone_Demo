-- Enums
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Profiles table
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  phone text,
  role public.user_role DEFAULT 'user'::public.user_role,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

-- Pricing table
CREATE TABLE public.pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_type text UNIQUE NOT NULL,
  h1_base numeric NOT NULL,
  h3_base numeric NOT NULL,
  h5_base numeric NOT NULL,
  weekend_multiplier numeric DEFAULT 1.2,
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  time_slot text NOT NULL,
  console_type text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  profile_id uuid REFERENCES public.profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Blocked slots table
CREATE TABLE public.blocked_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  time_slot text NOT NULL,
  console_type text NOT NULL,
  reason text,
  created_at timestamptz DEFAULT now()
);

-- RLS Enablement
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

-- Helper function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid AND p.role = 'admin'::public.user_role
  );
$$;

-- Profiles Policies
CREATE POLICY "Admins have full access to profiles" ON public.profiles
  FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Pricing Policies
CREATE POLICY "Anyone can view pricing" ON public.pricing
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage pricing" ON public.pricing
  FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Bookings Policies
CREATE POLICY "Anyone can check bookings (to filter slots)" ON public.bookings
  FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert bookings" ON public.bookings
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Admins can manage bookings" ON public.bookings
  FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Blocked Slots Policies
CREATE POLICY "Anyone can view blocked slots" ON public.blocked_slots
  FOR SELECT TO public USING (true);

CREATE POLICY "Admins can manage blocked slots" ON public.blocked_slots
  FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Trigger for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
user_count int;
BEGIN
SELECT COUNT(*) INTO user_count FROM profiles;
INSERT INTO public.profiles (id, email, phone, role)
VALUES (
  NEW.id,
  NEW.email,
  NEW.phone,
  CASE WHEN user_count = 0 THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
);
RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.handle_new_user();

-- Initial Pricing Data
INSERT INTO public.pricing (game_type, h1_base, h3_base, h5_base, weekend_multiplier)
VALUES 
('PS5 Pro Station', 5, 12, 18, 1.2),
('High-End PC (RTX 4090)', 7, 18, 28, 1.3),
('VR Arena (Wireless)', 10, 25, 40, 1.2),
('Racing Simulator (Direct Drive)', 12, 30, 45, 1.2),
('Multiplayer Arena (Private Room)', 20, 50, 80, 1.5);
