import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  {
    ignores: [
      ".next/",
      "node_modules/",
      "out/",
      "build/",
    ],
  },
  {
    files: ["**/*.js", "**/*.mjs", "**/*.jsx"],
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in modern Next.js
      "react/prop-types": "off", // Optional: disable if you don't use prop-types
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
];

export default config;