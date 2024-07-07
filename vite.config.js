import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({
    command,
    mode,
    ssrBuild
}) => {

    if (mode === 'lib') {
        return {
            build: {
                lib: {
                    // Could also be a dictionary or array of multiple entry points
                    entry: resolve(__dirname, 'lib/main.js'),
                    name: 'Loading',
                    // the proper extensions will be added
                    // fileName: 'notice-message', // 默认 fileName 是 package.json 的 name 选项
                    formats: ['es', 'umd', 'iife'],
                },
                rollupOptions: {
                    // 确保外部化处理那些你不想打包进库的依赖
                    // external: ['cash-dom'],
                    // output: {
                    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                    //     globals: {
                    //         vue: 'Vue',
                    //     },
                    // },
                },
                copyPublicDir: false,
            },
            plugins: [
                dts({
                    include: ['src/LoadingSign']
                }),
                // Look at this: https://github.com/vitejs/vite/issues/1579
                cssInjectedByJsPlugin(),
            ],
        }
    } else if (mode === 'docs') {
        return {
            base: './',
            build: {
                outDir: "docs"
            }
        }
    } else {
        return {}
    }
})