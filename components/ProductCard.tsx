'use client';

import Rating from '@/components/Rating';
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';

export default function ProductCard({ product, index }: any) {
  const { addItem } = useShoppingCart();

  function onAddToCart(event: any) {
    event.preventDefault();
    const id = toast.loading('Adding 1 item..');
    addItem(product);
    toast.success(`${product.name} added`, { id });
  }

  return (
    <div className='rounded-md group overflow-hidden'>
      <Link href={`/products/${product.id}`}>
        <div className='relative w-full h-80'>
          <Image
            src={product.image}
            alt={product.name}
            priority={index === 0}
            sizes='100%'
            fill
            style={{
              objectFit: 'contain',
            }}
            className='object-cover'
            quality={99}
          />
        </div>
      </Link>

      <div className='p-6'>
        <p className='font-semibold text-lg'>{product.name}</p>
        <Rating />
        <div className='mt-4 flex items-center justify-between space-x-2'>
          <p>Price</p>
          <p className='text-lg font-semibold'>
            {formatCurrencyString({
              currency: product.currency,
              value: product.price,
            })}
          </p>
        </div>

        <div className='mt-4 flex items-center justify-between space-x-2'>
          <Button size='sm' onClick={onAddToCart} radius='sm' color='default'>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
