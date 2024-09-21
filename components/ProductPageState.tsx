'use client';

import FormatCurrency from '@/utils/formatCurrency';
import { CheckIcon } from '@heroicons/react/24/outline';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useShoppingCart } from 'use-shopping-cart';

export default function ProductPageState({ product }: any) {
  const [count, setCount] = useState(1);

  const { addItem } = useShoppingCart();

  function onAddToCart(event: any) {
    event.preventDefault();

    const id = toast.loading(`Adding ${count} item${count > 1 ? 's' : ''}`);
    addItem(product, { count });
    toast.success(`${count} ${product.name} added`, { id });
  }

  return (
    <div className='flex flex-col sm:flex-row gap-6'>
      {/* Product Image */}
      <div className='relative h-72 w-72 sm:w-96 sm:h-96'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes='100%'
          priority
        />
      </div>

      {/* Product Details */}
      <div className='w-full flex-1 max-w-md rounded-md p-4 sm:p-6'>
        <h2 className='text-2xl sm:text-3xl font-semibold'>{product.name}</h2>
        <p className='pt-2 flex justify-center items-center space-x-2'>
          <CheckIcon className='text-lime-500 w-5 h-5 sm:w-6 sm:h-6' />
          <span className='font-semibold text-base sm:text-lg'>In stock</span>
        </p>

        {/* Price */}
        <div className='mt-4'>
          <p className='text-gray-500 text-sm sm:text-base'>Price</p>
          <p className='text-xl sm:text-2xl font-semibold'>
            <FormatCurrency value={product.price} currency={product.currency} />
          </p>
        </div>

        {/* Quantity Selector */}
        <div className='mt-4'>
          <p className='text-gray-500 text-sm sm:text-base text-center'>
            Quantity:
          </p>
          <div className='mt-4 flex items-center justify-center space-x-3'>
            <button
              disabled={count < 1}
              onClick={() => setCount(count - 1)}
              className='p-1 rounded-md hover:bg-rose-100 hover:text-rose-500'
            >
              <MinusCircleIcon className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' />
            </button>

            <p className='font-semibold text-lg sm:text-xl'>{count}</p>

            <button
              onClick={() => setCount(count + 1)}
              className='p-1 rounded-md hover:bg-green-100 hover:text-green-500'
            >
              <PlusCircleIcon className='w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0' />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={onAddToCart}
          disabled={count === 0}
          className='w-full mt-6 sm:mt-8 disabled:cursor-not-allowed'
          size='lg'
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
}
