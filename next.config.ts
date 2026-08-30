import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    // Con useTypeScriptCli:false, `next build` type-checkea el proyecto con
    // la API de TypeScript 6.0 (`typescript/lib/typescript.js`), NO con
    // TypeScript 7 — usa el paquete `typescript` tal como queda resuelto por
    // el alias `npm:@typescript/typescript6` (ver package.json), no el TS 7
    // real instalado como `@typescript/native`.
    //
    // Por qué: Next 16 por defecto (useTypeScriptCli:true) resuelve el
    // paquete `typescript` por nombre y ejecuta su binario CLI
    // (`typescript/bin/tsc`). El alias @typescript/typescript6 solo expone
    // el binario `tsc6`, no `tsc`, así que ese modo CLI no encuentra nada
    // que ejecutar y `next build` falla. El checker por API sí funciona
    // porque `@typescript/typescript6` incluye `lib/typescript.js`.
    //
    // `pnpm typecheck` (`tsc --noEmit`) no se ve afectado por esto: sigue
    // usando TypeScript 7 real vía `node_modules/.bin/tsc`, que viene de
    // `@typescript/native` (ver package.json).
    //
    // Revertir este ajuste (y el alias de `typescript` en package.json)
    // cuando typescript-eslint soporte TypeScript 7:
    // https://github.com/typescript-eslint/typescript-eslint/issues/10940
    useTypeScriptCli: false,
  },
};

export default nextConfig;
