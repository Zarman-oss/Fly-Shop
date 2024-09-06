/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'asset.cloudinary.com', 'files.stripe.com'],
  },
};

module.exports = nextConfig;
