import typescript from 'rollup-plugin-typescript2';
import clear from 'rollup-plugin-clear';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
// import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

console.log('@dream/hooks::');

export default {
    input: ['./src/index.ts'],
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    plugins: [
        typescript(), // 会自动读取sconfig.json配置文件
        postcss({
            extensions: ['.css'], // 将less解析成css
            extract: true,
            modules: true,
            less: { javascriptEnabled: true },
        }),
        clear({
            targets: ['dist'],
        }),
        replace({
            preventAssignment: true,
            'process.env.NODE_ENV': JSON.stringify('production'), // 否则会报：process is not defined的错
        }),
        nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
        commonjs(),
        babel({ babelHelpers: 'bundled' }), // 会自动读取babel的配置文件
        // terser(),
    ],
    external: [
        {
            includeDependencies: true,
        },
        {
            react: 'react',
        },
    ], // 项目中引用的第三方库
};
