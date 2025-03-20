import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["public.readdy.ai"],
  },
};

export default nextConfig;

// // next.config.js
// module.exports = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'your-domain.com',
//         pathname: '/images/**',
//       },
//     ],
//   },
// };