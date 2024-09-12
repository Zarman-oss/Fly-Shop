'use client';

import { CartProvider } from 'use-shopping-cart';

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function ClientOnlyCartProvider({ children }: any) {
  return (
    <CartProvider stripe={stripeKey} cartMode='checkout-session' currency='USD'>
      {children}
    </CartProvider>
  );
}
