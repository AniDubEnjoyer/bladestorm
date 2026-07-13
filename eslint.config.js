import eslint from "@eslint/js";
import tseslint from "typescript-eslint"; // Remove if using vanilla JavaScript
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    // Base JS configuration
    eslint.configs.recommended,

    // Base TypeScript configuration (Remove if using vanilla JavaScript)
    ...tseslint.configs.recommended,

    // React configuration
    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        plugins: {
            react: pluginReact,
            "react-hooks": pluginReactHooks,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true, // Enable JSX parsing
                },
            },
            globals: {
                ...globals.browser, // Adds window, document, etc.
            },
        },
        settings: {
            react: {
                version: "detect", // Automatically detects your React version
            },
        },
        rules: {
            // Recommended React & Hooks rules
            ...pluginReact.configs.flat.recommended.rules,
            ...pluginReact.configs.flat["jsx-runtime"].rules, // Suppresses 'React must be in scope' errors for React 17+
            ...pluginReactHooks.configs.recommended.rules,

            // Custom rule overrides
            "react/prop-types": "off", // Disable if using TypeScript for props validation
        },
    },
];
