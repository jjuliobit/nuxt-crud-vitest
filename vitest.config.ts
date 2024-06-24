import { defineConfig } from 'vitest/config'
import AutoImport from "unplugin-auto-import/vite";
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            dirs: ['./components'], // Auto-importará tudo dentro da pasta components
        }),
        AutoImport({
            imports: [
                'vue',
                'vitest',
                'pinia', // Se você estiver usando Pinia
            ],
            dirs: ['./composables', './stores', './utils'], // Escolha quais pastas deseja auto-importar
            dts: true,
        }),
    ],
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ["__tests__/**/**.spec.ts"]
    },

    resolve: {
        alias: {
            '@': '/',
            '~': '/',
        },
    },
});
