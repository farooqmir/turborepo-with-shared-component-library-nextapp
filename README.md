# Turborepo starter setup with shared common core components library, nextjs app, docs storybook, shared configrations, tailwindcss, postcss
Configurations already part of the package are:

1. Core library for react components - shared with other projects, used to create your application using reusable components from core library.
2. Core shared 'utils', for all your utilities.
3. Shared configrations for typescipt, postcss, next, tailwindcss
4. React next app, project application that uses core shared packages like, core component library, configrations, utils etc.

Tools preconfigured:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Changesets](https://github.com/changesets/changesets) for managing versioning and changelogs
- [GitHub Actions](https://github.com/changesets/action) for fully automated package publishing

## Using this example

Clone the setup locally or [from GitHub](https://github.com/farooqmir/turborepo-with-shared-component-library-nextapp):


```bash
npx degit https://github.com/farooqmir/turborepo-with-shared-component-library-nextapp
cd design-system
yarn install
git init . && git add . && git commit -m "Init"
```

### Useful Commands

- `yarn build` - Build all packages including the Storybook site
- `yarn dev` - Run all packages locally and preview with Storybook
- `yarn lint` - Lint all packages
- `yarn changeset` - Generate a changeset
- `yarn clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Apps & Packages

This Turborepo includes the following packages and applications:

- `apps/docs`: Documentation core components in storybook
- `packages/@eg/core`: Core shared React components
- `packages/@eg/utils`: Shared utilities
- `packages/@eg/tsconfig`: Shared `tsconfig.json`s used throughout the monorepo
- `packages/eslint-config-eg`: ESLint preset

To install a dependency for the entire monorepo, use the `-W` workspaces flag with `yarn add`.

### Compilation

To make the core library code work across all browsers, we need to compile the raw TypeScript and React code to plain JavaScript. We can accomplish this with `tsup`, which uses `esbuild` to greatly improve performance.

For `eg-core`, the `build` command is the following:

```bash
tsup src/index.tsx --format esm,cjs --dts --external react
```

`tsup` compiles `src/index.tsx`, which exports all of the components in the design system, into both ES Modules and CommonJS formats as well as their TypeScript types. The `package.json` for `eg-core` then instructs the consumer to select the correct format:

```json:eg-core/package.json
{
  "name": "@eg/core",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "sideEffects": false,
}
```

Run `yarn build` to confirm compilation is working correctly. You should see a folder `eg-core/dist` which contains the compiled output.

```bash
eg-core
└── dist
    ├── index.d.ts  <-- Types
    ├── index.js    <-- CommonJS version
    └── index.mjs   <-- ES Modules version
```

### Generating the Changelog

To generate your changelog, run `yarn changeset` locally:

1. **Which packages would you like to include?** – This shows which packages and changed and which have remained the same. By default, no packages are included. Press `space` to select the packages you want to include in the `changeset`.
1. **Which packages should have a major bump?** – Press `space` to select the packages you want to bump versions for.
1. If doing the first major version, confirm you want to release.
1. Write a summary for the changes.
1. Confirm the changeset looks as expected.
1. A new Markdown file will be created in the `changeset` folder with the summary and a list of the packages included.

### Releasing

When you push your code to GitHub, the [GitHub Action](https://github.com/changesets/action) will run the `release` script defined in the root `package.json`:

```bash
turbo run build --filter=docs^... && changeset publish
```

Turborepo runs the `build` script for all publishable packages (excluding docs) and publishes the packages to npm. By default, this example includes `eg` as the npm organization. To change this, do the following:

- Rename folders in `packages/*` to replace `eg` with your desired scope
- Search and replace `eg` with your desired scope
- Re-run `yarn install`

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```
