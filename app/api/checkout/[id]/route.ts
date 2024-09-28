import { stripe } from '@/utils/stripe';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Validate the session ID format
    if (!id || !id.startsWith('cs_')) {
      return NextResponse.json(
        { error: 'Incorrect checkout session id' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(id);

    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error retrieving checkout session:', error);

    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
