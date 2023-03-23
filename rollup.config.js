const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
// const serve = require('rollup-plugin-serve')
// const livereload = require('rollup-plugin-livereload')

const isDev = process.env.NODE_ENV === 'developer'

module.exports = {
  input: './src/pipe.ts',
  output: [
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'PipeAxios',
      sourcemap: isDev,
      globals: {
        axios: 'axios'
      }
    },
    {
      file: './dist/index.esm.js',
      format: 'es',
      name: 'PipeAxios',
      sourcemap: isDev,
      globals: {
        axios: 'axios'
      }
    },
    {
      file: './dist/index.cjs.js',
      format: 'cjs',
      name: 'PipeAxios',
      sourcemap: isDev,
      globals: {
        axios: 'axios'
      }
    }
  ],
  external: ['axios'],
  plugins: [
    typescript(),
    json(),
    commonjs(),
    resolve(),
    isDev && terser()
    // isDev &&
    //   serve({
    //     openPage: '/example/index.html',
    //     port: 10001
    //   })
    // isDev &&
    //   livereload({
    //     watch: 'dist',
    //     verbose: true
    //   })
  ]
}
