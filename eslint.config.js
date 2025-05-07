import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  stylistic.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
