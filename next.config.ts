import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// module.exports = {
//   images: {
//     remotePatterns: [new URL("https://res.cloudinary.com/dnyrrcacd/image/upload/v1745674661/porto%20commerce%20web-v1/Porto%20web/cy1_l6vyyp.jpg")], 
//   },
// }
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     pathname: '/dnyrrcacd/image/upload/v1745674661/porto%20commerce%20web-v1/Porto%20web/cy1_l6vyyp.jpg'
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     pathname: '/dnyrrcacd/image/upload/v1745675461/porto%20commerce%20web-v1/Porto%20web/cy3_rmugix.jpg'
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     pathname: '/dnyrrcacd/image/upload/v1745675460/porto%20commerce%20web-v1/Porto%20web/cy4_ebjmkw.jpg'
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     pathname: 'dnyrrcacd/image/upload/v1745675459/porto%20commerce%20web-v1/Porto%20web/cy2_xccl6v.jpg'
    //   }
    // ],
  },
}
export default nextConfig;

//https://res.cloudinary.com/dnyrrcacd/image/upload/v1745674661/porto%20commerce%20web-v1/Porto%20web/cy1_l6vyyp.jpg