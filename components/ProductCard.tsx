import Rating from '@/components/Rating';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, index }: any) {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : '/placeholder.jpg';
  const price = product.default_price
    ? (product.default_price.unit_amount / 100).toFixed(2)
    : 'N/A';
  const currency = product.default_price
    ? product.default_price.currency.toUpperCase()
    : '';

  return (
    <Link
      href={`/products/${product.id}`}
      className='rounded-md group overflow-hidden'
    >
      <div className='relative w-full h-80'>
        <Image
          src={imageUrl}
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
      <div className='p-6'>
        <p className='font-semibold text-lg'>{product.name}</p>
        <Rating />
        <div className='mt-4 flex items-center justify-between space-x-2'>
          <div>
            <p>Price</p>
            <p className='text-lg font-semibold'>
              {currency} {price}
            </p>
          </div>
          <button className='border rounded-lg py-1 px-2'>Add to cart</button>
        </div>
      </div>
    </Link>
  );
}
