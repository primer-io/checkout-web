/** @type {import('@builder.io/mitosis').MitosisConfig} */
// eslint-disable-next-line no-undef
module.exports = {
  dest: '../packages',
  files: 'src/**',
  exclude: ['**/*.spec.ts'],

  // commented targets do not support "context"
  targets: [
    // 'angular',
    // 'customElement',
    // 'html',
    // 'lit',
    'preact',
    'qwik',
    'react',
    'reactNative',
    'solid',
    'svelte',
    'vue3',
    // 'webcomponent',
  ],

  commonOptions: {
    typescript: true,
  },
  options: {
    preact: { typescript: true },
    qwik: { typescript: true },
    react: { typescript: true },
    reactNative: { typescript: true },
    solid: { typescript: true },
    svelte: { typescript: true },
    vue3: { typescript: true },
  },
};
