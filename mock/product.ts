import { defineMock } from 'umi';
import mockjs from 'mockjs';

type Product = {
    id: string;
    name: string;
};

/**
 * 产品列表数据
 */
let products: Product[] = mockjs.mock({
    'list|100': [
        {
            id: '@id',
            name: '@city',
        },
    ],
}).list;

/**
 * Mock
 * 可以使用 defineMock 类型帮助函数来提供编写 mock 对象的代码提示
 */
export default defineMock({
    /**
     * 当 HTTP 的请求方法是 GET 时，可以省略方法部分，只需要路径即可
     * 自定义函数：获取产品列表
     * @param _ 请求参数
     * @param res 返回参数
     */
    'GET /api/products': (_, res) => {
        res.send({
            status: 'ok',
            data: products,
        });
    },

    /**
     * 也可以用不同的请求方法，例如 POST，PUT，DELETE
     * 自定义函数：删除产品
     * @param req 请求参数
     * @param res 返回参数
     */
    'DELETE /api/products/:id': (req, res) => {
        products = products.filter(item => item.id !== req.params.id);
        res.send({
            status: 'ok',
        });
    },
});
