/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "file.raovatlamdong.vn",
    ],
  },
};

export default nextConfig;
