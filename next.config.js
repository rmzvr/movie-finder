/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'hwr.org.uk',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
