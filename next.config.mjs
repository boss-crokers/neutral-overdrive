/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are appended for clean static URLs
  trailingSlash: true,
};

export default nextConfig;
