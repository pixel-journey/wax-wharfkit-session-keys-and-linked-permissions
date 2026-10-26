/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@wharfkit/session",
    "@wharfkit/antelope",
    "@wharfkit/wallet-plugin-anchor",
    "@wharfkit/wallet-plugin-cloudwallet",
    "@wharfkit/web-renderer",
  ],
};

export default nextConfig;
