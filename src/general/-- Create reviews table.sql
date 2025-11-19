-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  photo TEXT, -- stores base64 or image URL
  avatar VARCHAR(10) NOT NULL, -- stores emoji
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster queries
CREATE INDEX idx_reviews_email ON reviews(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_reviews_created_at ON reviews(created_at DESC);

-- Create a function to auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert reviews (public submissions)
CREATE POLICY "Allow anyone to insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read reviews (public display)
CREATE POLICY "Allow anyone to read reviews" ON reviews
  FOR SELECT USING (true);