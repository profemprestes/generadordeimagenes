import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  experimental: {
    // Con useTypeScriptCli:false, `next build` type-checkea el proyecto con
    // la API de TypeScript 6.0 (`typescript/lib/typescript.js`), NO con
    // TypeScript 7 — usa el paquete `typescript` tal como queda resuelto por
    // el alias `npm:@typescript/typescript6` (ver package.json), no el TS 7
    // real instalado como `@typescript/native`.
    useTypeScriptCli: false,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
