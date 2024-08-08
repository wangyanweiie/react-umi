import { defineMock } from 'umi';

type Product = {
    id: string;
    name: string;
};

/**
 * 产品列表数据
 */
let products: Product[] = [
    { id: '1', name: 'Umi' },
    { id: '2', name: 'Ant Design' },
    { id: '3', name: 'Ant Design Pro' },
    { id: '4', name: 'React' },
];

/**
 * Mock
 */
export default defineMock({
    // 获取产品列表
    'GET /api/products': (_, res) => {
        res.send({
            status: 'ok',
            data: products,
        });
    },

    // 删除产品
    'DELETE /api/products/:id': (req, res) => {
        products = products.filter(item => item.id !== req.params.id);
        res.send({
            status: 'ok',
        });
    },
});
