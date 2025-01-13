/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en', 'hi', 'mr', 'gu', 'or', 'bn'],
    defaultLocale: 'en',
    localeDetection: false, // We'll handle locale detection ourselves
  },
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
