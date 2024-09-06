import { products } from '@/products';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51Pu5prP3Qh8xwkF6AMGicPrXOIiec5kC5kvBdS2jzRIzIpKzMjgScVYtXPvOxEF2INvC3vB0MzTDMFCqDXoYIGGZ0072cRhhMs'
);

const createProductsInStripe = async () => {
  try {
    for (const product of products) {
      const stripeProduct = await stripe.products.create({
        name: product.name,
        images: [product.image],
        default_price_data: {
          currency: product.currency,
          unit_amount_decimal: Math.round(product.price * 100),
        },
      });
      console.log(stripeProduct.name, ':', stripeProduct.id);
    }
  } catch (error) {
    console.error('Error creating product in Stripe:', error);
  }
};

createProductsInStripe();
