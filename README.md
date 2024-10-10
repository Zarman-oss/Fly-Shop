# Fly Shop eCommerce

Welcome to Fly Shop, an eCommerce platform for selling premium fishing gear. This project integrates Stripe for checkout and uses the `use-shopping-cart` library to manage the shopping cart experience.

## Features

- **Product Catalog**: View a wide selection of fly fishing products.
- **Shopping Cart**: Add, remove, and update items in your cart using the `use-shopping-cart` library.
- **Stripe Checkout**: Secure payment processing through Stripe Checkout.
- **Responsive Design**: Optimized for all devices.
  
## Tech Stack

- **React.js**: Frontend framework
- **use-shopping-cart**: Shopping cart management
- **Stripe**: Payment gateway.

## Prerequisites

Make sure you have the following installed:

- Node.js (v14+)
- npm or yarn
- Stripe account

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/fly-shop-ecommerce.git
    cd fly-shop-ecommerce
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root of the project and add the following:

    ```env
    REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-public-key
    STRIPE_SECRET_KEY=your-stripe-secret-key
    ```

4. Start the development server:

    ```bash
    npm start
    ```

5. The app should now be running at `http://localhost:3000`.

## Usage

### Adding Products to the Cart

- Browse the product catalog and click "Add to Cart" to add items to your cart.
- Adjust the quantity of items in the cart by using the +/- buttons in the cart interface.

### Checkout

- Once you've added items to your cart, click on the **Checkout** button.
- This will redirect you to Stripe's secure checkout page, where you can complete your purchase.


## How to Set Up Stripe

1. Sign up for a [Stripe](https://stripe.com) account if you haven't already.
2. Get your **public** and **secret** API keys from the Stripe dashboard.
3. Add your **public** key to the `.env` file as `REACT_APP_STRIPE_PUBLIC_KEY` and **secret** key as `STRIPE_SECRET_KEY`.
4. In the `server` folder, configure the backend API routes to create a Stripe checkout session.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

