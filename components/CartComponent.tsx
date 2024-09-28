'use client';

import { Button } from '@nextui-org/button';
import { NextResponse } from 'next/server';
import Link from 'next/link';
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import CartProduct from './CartProduct';

export default function CartComponent() {
  const {
    cartCount,
    clearCart,
    formattedTotalPrice,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  const [isRedirecting, setIsRedirecting] = useState(false);

  async function onCheckout() {
    if (cartCount! > 0) {
      try {
        setIsRedirecting(true);

        // Send the cartDetails in the request body
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartDetails }), // Pass cart details to the backend
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || 'Failed to create checkout session'
          );
        }

        const { sessionId } = await response.json(); // Fix: Get 'sessionId' from the response
        await redirectToCheckout(sessionId); // Fix: Use 'sessionId' for redirection
      } catch (error) {
        console.error('Error:', error.message);
        // Handle the error, e.g., show a message to the user
      } finally {
        setIsRedirecting(false);
      }
    }
  }

  return (
    <div className='container xl:max-w-screen-xl mx-auto py-12 px-6'>
      {cartCount! > 0 ? (
        <>
          <h2 className='text-4xl font-semibold'>Your shopping cart</h2>
          <p className='mt-1 text-xl'>
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
            <button
              onClick={() => clearCart()}
              className='opacity-50 hover:opacity-100 text-base capitalize ml-2'
            >
              (Clear all)
            </button>
          </p>

          <div className='mt-12 space-y-4'>
            {Object.entries(cartDetails!).map(([productId, product]) => (
              <CartProduct key={productId} product={product} />
            ))}

            <div className='flex flex-col items-end py-4 mt-8'>
              <p className='text-xl'>
                Total:{' '}
                <span className='font-semibold'>{formattedTotalPrice}</span>
              </p>
              <Button
                className='mt-4 max-w-max'
                color='warning'
                variant='solid'
                radius='none'
                onPress={onCheckout}
                disabled={isRedirecting}
              >
                {isRedirecting ? 'Redirecting...' : 'Go to checkout'}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className='text-4xl font-semibold'>
            Your shopping cart is empty
          </h2>
          <p className='mt-1 text-xl'>
            Check out our awesome products{' '}
            <Link href='/' className='text-red-500 underline'>
              here!
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
