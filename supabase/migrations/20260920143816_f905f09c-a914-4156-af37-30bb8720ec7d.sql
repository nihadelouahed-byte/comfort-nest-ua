CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL CHECK (char_length(trim(full_name)) BETWEEN 3 AND 120),
  wilaya TEXT NOT NULL CHECK (char_length(trim(wilaya)) BETWEEN 2 AND 80),
  commune TEXT NOT NULL CHECK (char_length(trim(commune)) BETWEEN 2 AND 100),
  phone_primary TEXT NOT NULL CHECK (phone_primary ~ '^0[5-7][0-9]{8}$'),
  phone_secondary TEXT CHECK (phone_secondary IS NULL OR phone_secondary = '' OR phone_secondary ~ '^0[5-7][0-9]{8}$'),
  language TEXT NOT NULL DEFAULT 'ar' CHECK (language IN ('ar', 'fr')),
  product_name TEXT NOT NULL DEFAULT 'Coussin de grossesse',
  price_dzd INTEGER NOT NULL DEFAULT 3800 CHECK (price_dzd = 3800),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon;
GRANT INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can place an order"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (
  price_dzd = 3800
  AND product_name = 'Coussin de grossesse'
  AND status = 'new'
);