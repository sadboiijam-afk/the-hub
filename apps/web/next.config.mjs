/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["@lucid/config", "@lucid/shared-types", "@lucid/ui"]
};

export default nextConfig;
