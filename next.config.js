/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com",'https://clone-uber-esqui.herokuapp.com'],
  },
}

module.exports = nextConfig
