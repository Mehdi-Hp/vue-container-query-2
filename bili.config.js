import pkg from './package.json';

export default {
    input: './src/cq.js',
    output: {
        moduleName: 'ContainerQuery',
        minify: true,
        format: [
            'cjs',
            'umd',
            'esm',
            'iife'
        ],
        dir: 'dist'
    },
    externals: [
        ...Object.keys(pkg.peerDependencies || {})
    ],
    plugins: {
        commonjs: true,
        'node-resolve': {
            browser: true,
            preferBuiltins: false
        },
        strip: (() => {
            if (process.env.NODE_ENV !== 'development') {
                return {
                    debugger: true,
                    functions: ['console.*', 'assert.*', 'debug', 'alert'],
                    sourceMap: true
                };
            }
            return false;
        })()
    }
};
