/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/bloggy",
  output: "exports",
  experimental:{
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = nextConfig
