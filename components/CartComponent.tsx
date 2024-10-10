'use client';

import { Button } from '@nextui-org/button';
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

        const { sessionId } = await response.json();
        await redirectToCheckout(sessionId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'An unknown error occurred';
        console.error('Error:', errorMessage);
      } finally {
        setIsRedirecting(false);
      }
    }
  }

  return (
    <div className='container xl:max-w-screen-xl mx-auto py-8 px-4 sm:py-12 sm:px-6'>
      {cartCount! > 0 ? (
        <>
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            Your shopping cart
          </h2>
          <p className='mt-1 text-lg sm:text-xl'>
            {cartCount} {cartCount === 1 ? 'item' : 'items'}
            <button
              onClick={() => clearCart()}
              className='opacity-50 hover:opacity-100 text-sm sm:text-base capitalize ml-2'
            >
              (Clear all)
            </button>
          </p>

          <div className='mt-8 sm:mt-12 space-y-4'>
            {Object.entries(cartDetails!).map(([productId, product]) => (
              <CartProduct key={productId} product={product} />
            ))}

            <div className='flex flex-col items-end py-4 mt-8'>
              <p className='text-lg sm:text-xl'>
                Total:{' '}
                <span className='font-semibold'>{formattedTotalPrice}</span>
              </p>
              <Button
                className='mt-4 w-full sm:max-w-max'
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
          <h2 className='text-3xl sm:text-4xl font-semibold'>
            Your shopping cart is empty
          </h2>
          <p className='mt-1 text-lg sm:text-xl'>
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
