module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended-type-checked", // https://typescript-eslint.io/linting/typed-linting/
    "google",
  ],
  parser: "@typescript-eslint/parser", // https://typescript-eslint.io/packages/parser/
  parserOptions: {
    ecmaVersion: "latest", // Always take last version of ECMAScript
    sourceType: "module",
    project: true, // Required for @typescript-eslint/recommended-type-checked
    tsconfigRootDir: ".", // Where your tsconfig.json file is located
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    // Ignore some files
    "node_modules/",
    "dist/",
    ".eslintrc.js",
    "babel.config.js",
    "jest.config.js",
    "metro.config.js",
    "index.js",
  ],
  plugins: [
    "@typescript-eslint", // https://typescript-eslint.io/
    "eslint-plugin-unused-imports", // https://www.npmjs.com/package/eslint-plugin-unused-imports
    "eslint-plugin-simple-import-sort", // https://www.npmjs.com/package/eslint-plugin-simple-import-sort
  ],
  rules: {
    /* *** Typescript rules *** */
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/adjacent-overload-signatures": "error", // Place all overload signatures next to each other
    "@typescript-eslint/array-type": [
      // use string[] for simple arrays and Array<string> for complex
      "error",
      {
        default: "array-simple",
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off", // Disallow all @ts-<directive> comments
    "@typescript-eslint/prefer-enum-initializers": "off", // Force to initialise enum values
    "@typescript-eslint/ban-types": [
      // Ban particular types (String, Boolean, Number, Symbol...)
      "error",
      {
        types: {
          Object: {
            message: "Avoid using the `Object` type. Did you mean `object`?",
          },
          Function: {
            message:
              "Avoid using the `Function` type. Prefer a specific function type, like `() => void`.",
          },
          Boolean: {
            message: "Avoid using the `Boolean` type. Did you mean `boolean`?",
          },
          Number: {
            message: "Avoid using the `Number` type. Did you mean `number`?",
          },
          String: {
            message: "Avoid using the `String` type. Did you mean `string`?",
          },
          Symbol: {
            message: "Avoid using the `Symbol` type. Did you mean `symbol`?",
          },
        },
      },
    ],
    "@typescript-eslint/consistent-generic-constructors": "error", // new Map<string, number>();
    "@typescript-eslint/consistent-indexed-object-style": ["error", "record"], // Correct : Record<string, unknown>, incorrect : { [key: string]: unknown }
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"], // Force to use types instead of interfaces (still can use interfaces when we extends something)
    "@typescript-eslint/consistent-type-exports": "error", // Force usage of export { Button } export type { ButtonProps }
    "@typescript-eslint/consistent-type-imports": "error", // Force usage of import type { ButtonProps } from './Button'
    "default-param-last": "off", // Disabled eslint rules for @typescript-eslint/default-param-last
    "@typescript-eslint/default-param-last": "error", // Force to put default parameters at the end of the function
    "@typescript-eslint/explicit-function-return-type": "off", // Need to explicit return type of function
    "@typescript-eslint/explicit-member-accessibility": [
      // Always require an accessor for class members
      "error",
      {
        accessibility: "explicit",
      },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "init-declarations": "off", // Disabled eslint rules for @typescript-eslint/init-declarations
    "@typescript-eslint/init-declarations": "off", // Initialize variables with a default value
    "@typescript-eslint/no-unsafe-argument": "off", // Allow any
    "@typescript-eslint/no-unsafe-enum-comparison": "off", // Disallow comparing an enum value with a non-enum value.
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-unsafe-return": "off", // Force a return type for a function (can be void)
    "@typescript-eslint/no-redundant-type-constituents": "error", // Disallow members of unions and intersections that do nothing or override type information. (type A = string | any => error)
    "@typescript-eslint/no-base-to-string": "error", // Require .toString() to only be called on objects which provide useful information when stringified.
    "@typescript-eslint/restrict-template-expressions": "off", // Enforce template literal expressions to be of string type.
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/await-thenable": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/member-ordering": "error", // Order interface/types members (https://typescript-eslint.io/rules/member-ordering)
    "@typescript-eslint/naming-convention": "off", // No naming convention. Could be a good idea to use it for boolean variables (is..., will...)
    "@typescript-eslint/no-floating-promises": "off", // Require Promise-like statements to be handled appropriately.
    "@typescript-eslint/no-empty-function": "off", // Disallow empty functions.
    "@typescript-eslint/no-empty-interface": [
      // Disallow the declaration of empty interfaces/type.
      "error",
      {
        allowSingleExtends: true,
      },
    ],
    "@typescript-eslint/no-explicit-any": "off", // Allow any
    "@typescript-eslint/no-misused-new": "error", // Enforce valid definition of new and constructor.
    "@typescript-eslint/no-namespace": "error", // Disallow TypeScript namespaces.
    "@typescript-eslint/no-redeclare": "off", // from doc : The code problem checked by this ESLint rule is automatically checked by the TypeScript compiler. Thus, it is not recommended to turn on this rule in new TypeScript projects. You only need to enable this rule if you prefer the ESLint error messages over the TypeScript compiler error messages.
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-this-alias": "error", // Disallow aliasing this. Cannot use const self = this then use self. use directly this.***
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-extra-semi": "off", // This rules is deprecated
    "@typescript-eslint/prefer-for-of": "error", // Enforce the use of for-of loop over the standard for loop where possible.
    "@typescript-eslint/prefer-function-type": "error", // Enforce using function types instead of interfaces with call signatures.
    "@typescript-eslint/prefer-namespace-keyword": "error", // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules.
    "@typescript-eslint/quotes": "off", // This rules is deprecated
    "@typescript-eslint/triple-slash-reference": "error", // Disallow triple slash directives => use import instead
    "@typescript-eslint/type-annotation-spacing": "off", // This rules is deprecated
    "@typescript-eslint/unified-signatures": "error", // Disallow two overloads that could be unified into one with a union or an optional/rest parameter.
    "@typescript-eslint/no-unused-vars": [
      // No unused variables exept if they start with "_"
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    /* *** ESlint rules *** */
    "arrow-body-style": ["off", "as-needed"], // Disallow braces around arrow function bodies exept if they don't need it
    "arrow-parens": ["error", "as-needed"], // Disallow parentheses around single arguments
    "constructor-super": "error", // Require super() calls in constructors
    curly: "error", // Enforce consistent brace style for all control statements
    "dot-notation": "error", // use Dot notation whenever possible
    "guard-for-in": "error", // Require for-in loops to include an if statement
    "id-blacklist": [
      // Blocklist specific identifiers for variables, constants...
      "error",
      "any",
      "Number",
      "number",
      "String",
      "string",
      "Boolean",
      "boolean",
      "Undefined",
      "undefined",
      "function",
      "Function",
    ],
    "id-match": "off", // Regex for names variable, function, constants... We disabled it because we sometimes want to use Pascal case for React components
    "max-len":
      // Maximum length of a line
      "off",
    "max-classes-per-file": ["error", 1], // Number of class per file
    "no-bitwise": "error", // Disallow bitwise operators like y | z. We use y || z instead
    "no-cond-assign": "error", // Disallow assignment operators in if statements
    "no-console": ["error", { allow: ["warn", "info", "error", "debug"] }], // No console exept warn and info
    "no-duplicate-case": "error", // Disallow duplicate case labels inside a switch statement
    "no-empty": "error", // No empty block
    "no-irregular-whitespace": "error", // No irregular whitespace
    "no-multiple-empty-lines": "error", // Disallow multiple (+1) empty lines
    "no-new-func": "error", // Disallow new Function()
    "no-new-wrappers": "error", //
    "no-return-await": "error", // Return don't need await, use directly the promise
    "no-sequences": "error", // Disallow comma operators
    "valid-jsdoc": "off",
    camelcase: "off",
    "no-sparse-arrays": "error", // Disallow Sparse arrays who contain empty slots, most frequently due to multiple commas being used in an array litera ([,,2])
    "no-template-curly-in-string": "error", // use `${}`
    "no-throw-literal": "off", // Throw an error instead of a string
    "no-undef-init": "error", // Disallow initializing variables to undefined
    "no-underscore-dangle": "off", // Off because we allow "_" in variable names when we are not using them
    "no-unsafe-finally": "error", // No direct return inside finally
    "no-unused-expressions": "off", // Already checked by @typescript-eslint/no-unused-expressions
    "no-unused-labels": "error", // Disallow unused labels
    "no-unused-vars": "off", // Already checked by @typescript-eslint/no-unused-vars
    "no-var": "off", // Use let or const instead of var
    "object-shorthand": "error", // Use shorthand for object properties
    "one-var": ["error", "never"],
    "prefer-const": "error", // Require const declarations for variables that are never reassigned after declared
    "prefer-object-spread": "error", // Prefer the use of the spread operator over Object.assign
    "quote-props": ["error", "as-needed"], // Use quotes arround keys only when needed
    "space-before-function-paren": "off",
    "space-in-parens": ["off", "never"],
    "spaced-comment": "error",
    "unused-imports/no-unused-imports-ts": "error",
    "react/no-unescaped-entities": "off",
    "use-isnan": "error",
    "valid-typeof": "off",

    /* *** Sort imports/exports rules *** */
    "simple-import-sort/imports": "error",
    "sort-imports": "off",
  },
};
