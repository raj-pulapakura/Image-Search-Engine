/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: './utils/imageLoader.ts',
      },
  }
   
module.exports = nextConfig