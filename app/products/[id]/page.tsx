import ProductPageState from '@/components/ProductPageState';
import { stripe } from '@/utils/stripe';

async function getProductData(productId: string) {
  const inventory = await stripe.products.list({
    expand: ['data.default_price'],
  });

  const product = inventory.data.find((product) => product.id === productId);

  if (product && product.default_price) {
    const price = product.default_price;
    return {
      currency: price.currency,
      id: product.id,
      image: product.images[0],
      name: product.name,
      price: price.unit_amount,
    };
  }
  return null;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductData(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className='container mx-auto py-12 px-6 lg:max-w-screen-lg '>
      <div className='flex flex-col md:flex-row justify-between items-center  space-y-8 md:space-y-0 md:space-x-12'>
        <ProductPageState product={product} />
      </div>
    </div>
  );
}
