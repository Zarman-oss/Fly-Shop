'use client';

import { CheckCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import { useShoppingCart } from 'use-shopping-cart';

export default function SuccessComponent() {
  const searchParams = useSearchParams();
  const { clearCart } = useShoppingCart();

  // Retrieve session ID from the query string
  const sessionId = searchParams.get('session_id');

  // Fetch checkout session details based on sessionId
  const { data, error } = useSWR(
    sessionId ? `/api/checkout/${sessionId}` : null,
    async (url) => {
      try {
        const res = await axios.post(url); // Use await with axios.post
        return res.data; // Return the data from the response
      } catch (err) {
        // Handle the error here if needed
        console.error(err);
        throw err; // Rethrow the error to be handled by SWR
      }
    },
    {
      onSuccess() {
        clearCart(); // This function will be called when data fetching is successful
      },
    }
  );

  // Check if data is still loading or if there's an error
  if (error) {
    return (
      <div className='p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto'>
        <p className='text-lg'>Sorry, something went wrong</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='p-2 rounded-md text-gray-500 max-w-md mx-auto'>
        <p className='text-lg'>Loading...</p>
      </div>
    );
  }

  // Customer email from the data
  const email = data?.customer_details?.email;

  return (
    <div className='container xl:max-w-screen-xl mx-auto py-12 px-6 text-center'>
      <div className='py-4 px-8 space-y-4 rounded-md max-w-lg mx-auto'>
        <CheckCircleIcon className='w-24 h-24 mx-auto flex-shrink-0 text-lime-600' />
        <h2 className='text-4xl font-semibold'>Thanks for your order!</h2>
        <p className='text-lg'>
          Check your email <span className='font-semibold'>{email}</span> for
          your invoice.
        </p>
      </div>
    </div>
  );
}
