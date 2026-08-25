import globals from "globals";

import gitignore from "eslint-config-flat-gitignore";

import eslintJS from "@eslint/js";
import eslintTS from "typescript-eslint";

import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";

import eslintPrettierConfig from "eslint-config-prettier/flat";

export default [
    // ##################################################################### //
    // #region Rule Sets
    // ##################################################################### //

    gitignore(),

    eslintJS.configs.recommended,
    ...eslintTS.configs.recommended,

    eslintPluginReact.configs.flat.recommended,
    eslintPluginReact.configs.flat["jsx-runtime"],
    eslintPluginReactHooks.configs.flat.recommended,
    eslintPluginReactCompiler.configs.recommended,

    eslintPrettierConfig,

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
    // ##################################################################### //
    // #region Overrides
    // ##################################################################### //

    {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        languageOptions: { globals: { ...globals.browser } },
        settings: { react: { version: "detect" } },
        rules: {
            "no-unused-vars": ["off"],
            "@typescript-eslint/no-unused-vars": [
                "error",
                { varsIgnorePattern: "_" },
            ],
        },
    },

    // ##################################################################### //
    // #endregion
    // ##################################################################### //
];
