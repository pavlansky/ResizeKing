import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  // Next.js recommended + Core Web Vitals
  ...nextVitals,
  ...nextTs,

  // Base rules for all TS/TSX files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-duplicate-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: ["../*", "./../*"],
        },
      ],
    },
  },

  // 🧱 Server Components (default in app/)
  {
    files: ["app/**/*.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: [
                "useState",
                "useEffect",
                "useLayoutEffect",
                "useRef",
                "useReducer",
                "useContext",
              ],
              message:
                  "This is a Server Component. Add 'use client' if you need hooks.",
            },
          ],
        },
      ],
      "no-restricted-globals": [
        "error",
        "window",
        "document",
        "navigator",
      ],
    },
  },

  // 🧩 Client Components (tools, UI)
  {
    files: [
      "app/**/page.tsx",
      "components/**/*.tsx",
    ],
    rules: {
      "no-restricted-globals": "off",
    },
  },

  // 🧠 lib/ — pure helpers only
  {
    files: ["lib/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-globals": [
        "error",
        "window",
        "document",
      ],
    },
  },

  // Disable stylistic rules handled by Prettier
  eslintConfigPrettier,

  // Ignore build artifacts
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
