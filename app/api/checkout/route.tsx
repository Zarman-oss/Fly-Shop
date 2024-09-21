import { stripe } from '@/utils/stripe';
import { validateCartItems } from 'use-shopping-cart/utilities';

export async function POST(request: Request) {
  try {
    const { cartDetails } = await request.json(); // Ensure cartDetails is sent from the client

    // Fetch inventory from Stripe
    const inventory = await stripe.products.list({
      expand: ['data.default_price'],
    });

    // Map Stripe products to a structure that matches `cartDetails`
    const products = inventory.data.map((product) => {
      const price = product.default_price;
      return {
        id: product.id, // Stripe product ID
        name: product.name,
        price: price.unit_amount, // Price in cents
        currency: price.currency,
        image: product.images[0],
      };
    });

    // Validate the cart items against the inventory
    const lineItems = validateCartItems(products, cartDetails);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cart`,
    });

    // Always return a JSON response
    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }, // Ensure the response is JSON
    });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }, // Ensure the error response is JSON
    });
  }
}
