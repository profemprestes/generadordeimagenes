import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // Next 16 defaults to type-checking via the `typescript` package's CLI
    // binary (`typescript/bin/tsc`), resolved by package name. `typescript`
    // is aliased to @typescript/typescript6 (see package.json) so
    // typescript-eslint keeps working on TS7, and that alias only ships a
    // `tsc6` bin, not `tsc`. Falling back to the classic API-based type
    // checker (`typescript/lib/typescript.js`, present in the alias) keeps
    // `next build`'s type checking working under the alias.
    useTypeScriptCli: false,
  },
};

export default nextConfig;
