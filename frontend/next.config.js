/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/:path*`, // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig
