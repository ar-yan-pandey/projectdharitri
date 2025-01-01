/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'agrijunction.s3.ap-south-1.amazonaws.com',
      '5.imimg.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'sdec.site',
      'aryanpandey.site'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
