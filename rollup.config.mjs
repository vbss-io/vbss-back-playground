import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const config = [
  {
    input: 'src/main.ts',
    output: {
      file: 'build/server.js',
      format: 'cjs'
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.json'
      }),
      commonjs({
        extensions: ['.js', '.ts']
      }),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ['node']
      }),
      json()
    ]
  }
]

export default config
