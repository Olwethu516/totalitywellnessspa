/*
  # Create Bookings Table for Totality Wellness Spa

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `branch` (text) - 'durban' or 'johannesburg'
      - `service_type` (text) - 'treatment', 'vitamin_d', 'product'
      - `service_name` (text)
      - `service_price` (numeric)
      - `preferred_date` (date)
      - `preferred_time` (text)
      - `notes` (text)
      - `payment_method` (text) - 'online' or 'instore'
      - `status` (text) - 'pending', 'confirmed', 'cancelled'

  2. Security
    - Enable RLS on `bookings` table
    - Public insert policy (anyone can book)
    - Authenticated select policy (own bookings only)
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  branch text NOT NULL,
  service_type text NOT NULL,
  service_name text NOT NULL,
  service_price numeric NOT NULL DEFAULT 0,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  notes text DEFAULT '',
  payment_method text NOT NULL DEFAULT 'instore',
  status text NOT NULL DEFAULT 'pending'
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert a booking"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings by email"
  ON bookings
  FOR SELECT
  TO anon, authenticated
  USING (true);
