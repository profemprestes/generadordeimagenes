import { createRequire } from "node:module";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const require = createRequire(import.meta.url);
const reactVersion = require("react/package.json").version;

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react@7.37.5's react.version:"detect" (set by eslint-config-next)
  // crashes under eslint@10.9.1: it calls context.getFilename(), which flat-config
  // ESLint 10 no longer exposes. Pin the version explicitly (read from the installed
  // react package, so it can't drift from package.json) to skip detection.
  {
    settings: {
      react: {
        version: reactVersion,
      },
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
