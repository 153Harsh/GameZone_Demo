-- Add duration_hours column to bookings table
ALTER TABLE public.bookings ADD COLUMN duration_hours integer NOT NULL DEFAULT 1;

-- Add total_price column to store calculated price
ALTER TABLE public.bookings ADD COLUMN total_price numeric;
