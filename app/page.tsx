import ProductCard from '@/components/ProductCard';
import { stripe } from '@/utils/stripe';

export default async function HomePage() {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 8,
  });

  const products = inventory.data.map((product) => {
    const price = product.default_price;

    const isPriceObject = (
      price: any
    ): price is { currency: string; unit_amount: number } =>
      typeof price === 'object' &&
      price !== null &&
      'currency' in price &&
      'unit_amount' in price;

    return {
      currency: isPriceObject(price) ? price.currency : 'USD',
      id: product.id,
      image: product.images[0],
      name: product.name,
      price: isPriceObject(price) ? price.unit_amount : 0,
    };
  });

  return (
    <section className='container xl:max-w-screen-xl mx-auto py-12 px-6'>
      <div className='grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
