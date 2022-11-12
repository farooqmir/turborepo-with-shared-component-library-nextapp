module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-eg`
  extends: ["eg"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
