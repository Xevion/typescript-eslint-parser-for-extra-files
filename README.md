# @xevion/ts-eslint-extra

Fork of [typescript-eslint-parser-for-extra-files](https://github.com/ota-meshi/typescript-eslint-parser-for-extra-files) with fixes for named export resolution from `.svelte` files.

An ESLint custom parser for Vue, Svelte, and Astro for use with TypeScript. It provides type information in combination with each framework's ESLint custom parser.

## ❓ What is this parser?

A custom ESLint parser that provides type information when importing `*.vue`, `*.svelte`, and `*.astro` files.

`@typescript-eslint/parser` provides type information mostly well, but if you import extra files (other than `*.ts`, `*.tsx`, `*.d.ts`, `*.js`, `*.jsx`, and `*.json`) it treats it as `any` type.

e.g.

```vue
<script lang="ts">
import HelloWorld from "./components/HelloWorld.vue"; // <- typescript program can't parse it. because it will read including template and style.

export default {
  name: "App",
  components: {
    HelloWorld, // <- so type information is `any`
  },
};
</script>
```

See also <https://github.com/vuejs/vue-eslint-parser/issues/104>, and <https://github.com/typescript-eslint/typescript-eslint/issues/2865>.

This parser can be used to provide type information for importing `*.vue`, `*.svelte`, and `*.astro` files.

This parser is used in combination with [vue-eslint-parser], [svelte-eslint-parser], and [astro-eslint-parser].

[vue-eslint-parser]: https://github.com/vuejs/vue-eslint-parser
[svelte-eslint-parser]: https://github.com/ota-meshi/svelte-eslint-parser
[astro-eslint-parser]: https://github.com/ota-meshi/astro-eslint-parser

## 💿 Installation

```bash
npm install --save-dev @xevion/ts-eslint-extra @typescript-eslint/parser@latest typescript@latest
```

### With Vue

Install `vue` v3.2.41 or newer.

```bash
npm install --save-dev vue@latest
```

### With Svelte

Install `svelte2tsx` v0.5.20 or newer.

```bash
npm install --save-dev svelte2tsx@latest svelte
```

### With Astro

Install `astrojs-compiler-sync` v0.3.1 or newer.

```bash
npm install --save-dev astrojs-compiler-sync@latest @astrojs/compiler
```

## 📖 Usage

1. Change the `include` in your `tsconfig.json` to include the component files (`*.vue`, `*.svelte`, and `*.astro`).

```jsonc
{
  "include": [
    "**/*.vue", // with Vue
    "**/*.svelte", // with Svelte
    "**/*.astro", // with Astro
    "**/*.ts",
    "**/*.tsx",
  ],
}
```

2. Write `overrides.parserOptions.parser` option in your `.eslintrc.cjs` file.

### With Vue

```js
{
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "parser": "@xevion/ts-eslint-extra",
            "parserOptions": {
                "project": "./tsconfig.json"
            },
        },
        {
            "files": ["*.vue"],
            "parser": "vue-eslint-parser",
            "parserOptions": {
                "parser": "@xevion/ts-eslint-extra",
                // Or
                // "parser": {
                //     "ts": require("@xevion/ts-eslint-extra")
                // }
                "project": "./tsconfig.json"
            },
        }
    ]
}
```

### With Svelte

```js
{
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "parser": "@xevion/ts-eslint-extra",
            "parserOptions": {
                "project": "./tsconfig.json"
            },
        },
        {
            "files": ["*.svelte"],
            "parser": "svelte-eslint-parser",
            "parserOptions": {
                "parser": "@xevion/ts-eslint-extra",
                // Or
                // "parser": {
                //     "ts": require("@xevion/ts-eslint-extra")
                // }
                "project": "./tsconfig.json"
            },
        }
    ]
}
```

### With Astro

```js
{
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "parser": "@xevion/ts-eslint-extra",
            "parserOptions": {
                "project": "./tsconfig.json"
            },
        },
        {
            "files": ["*.astro"],
            "parser": "astro-eslint-parser",
            "parserOptions": {
                "parser": "@xevion/ts-eslint-extra",
                "project": "./tsconfig.json"
            },
        }
    ]
}
```

## 👻 Limitations

- Angle bracket type assertions cannot be used:

  This parser parses as JSX enabled, therefore angle bracket type assertions cannot be used. Use the `as` operator instead.

  [The TypeScript Handbook - JSX > The `as` operator](https://www.typescriptlang.org/docs/handbook/jsx.html#the-as-operator)

## 🍻 Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

## 🔒 License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
