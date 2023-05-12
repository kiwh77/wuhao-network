const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')

const isDev = process.env.NODE_ENV === 'developer'

module.exports = {
  input: './src/index.ts',
  output: [
    {
      file: './dist/index.esm.js',
      format: 'es'
    },
    {
      file: './dist/index.cjs.js',
      format: 'cjs'
    }
  ],
  external: ['axios'],
  plugins: [typescript(), json(), commonjs(), resolve(), !isDev && terser()]
}
