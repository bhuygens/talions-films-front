/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'picsum.photos'
    ],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'doytvzvnj',
    CLOUDINARY_API_KEY: '221582844488538',
    CLOUDINARY_API_SECRET: '46Ac3LnJ_aZh44sIHe1IgdwXzEIx',
    NEXT_PUBLIC_API_URL: 'http://localhost:8080'
  }
}

module.exports = nextConfig
