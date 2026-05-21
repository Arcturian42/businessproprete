/**
 * Next.js configuration — CommonJS for maximum compatibility with
 * deploy detectors (Hostinger, Vercel, Netlify, Docker, etc.).
 *
 * Notes:
 * - `output: 'standalone'` produces a self-contained server bundle
 *   in `.next/standalone/` that any Node host can run with a single
 *   `node server.js`. Required by Hostinger's Node.js add-on and
 *   safe for Vercel (Vercel ignores the option, uses its own
 *   serverless packaging).
 * - We do NOT register `@next/mdx` here on purpose. Editorial MDX
 *   lives in `/content/` and is rendered at runtime by
 *   `next-mdx-remote/rsc` (see `components/content/mdx-renderer.tsx`),
 *   not as Next page extensions.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:-1, max-image-preview:large',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
