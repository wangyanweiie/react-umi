import { defineConfig } from 'umi';

/**
 * 配置文件，包含 Umi 所有非运行时配置（运行时配置一般定义于 app.ts）
 */
export default defineConfig({
    /**
     * 配置式路由
     * path：只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后；
     * component：配置 location 和 path 匹配后用于渲染的 React 组件路径，可以是绝对路径，也可以是相对路径。如果是相对路径，会从 src/pages 开始寻找；
     * routes：配置子路由，通常在需要为多个路径增加 layout 组件时使用；
     */
    routes: [
        { path: '/', component: 'index', name: 'home' },
        { path: '/docs', component: 'docs', name: 'docs' },
        { path: '/products', component: 'products', name: 'products' },
        { path: '/*', component: '@/pages/404' },
    ],
    plugins: ['@umijs/plugins/dist/react-query', '@umijs/plugins/dist/antd'],
    reactQuery: {},
    npmClient: 'pnpm',
    // 默认开启 mock，可手动关闭 mock
    // mock: false,
});
