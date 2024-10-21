import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'umi';

import ProductList from '@/components/ProductList';
import lessStyles from './products.less';

export default function ProductsPage() {
  const queryClient = useQueryClient();

  /**
   * @description useQuery
   * 查询是一种对于与唯一键值相关联的异步数据源的声明性依赖；
   * 查询可以与任何基于 Promise 的方法（包括 GET 和 POST 方法）一起使用，以从服务器获取数据；
   * @params queryKey：该查询的一个唯一的键值
   * @params queryFn：一个返回 Promise 的函数
   * @return { loading, error, data }
   */
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn() {
      return axios.get('/api/products').then((res) => res.data);
    },
  });
  
  /**
   * @description useMutation
   * 与查询不同，修改通常意味着用于创建/更新/删除数据或执行服务器命令等副作用；
   */
  const productsDeleteMutation = useMutation({
    mutationFn(id: string) {
      return axios.delete(`/api/products/${id}`);
    },

    // 预处理
    onMutate: (variables) => {
      console.log('mutate', variables);
    },

    // 错误处理
    onError: (error, variables, context) => {
      console.log('error', error, variables, context);
    },
    
    // 成功处理
    onSuccess: (data, variables, context) => {
      console.log('success', data, variables, context);
    },

    // 无论成功与否，都会执行
    onSettled: (data, error, variables, context) => {
      console.log('settled', data, error, variables, context);

      // 更新数据
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
    },
  });

  // 查询暂时还没有数据
  if (productsQuery.isLoading) {
    return 'loading...';
  };

  return (
    <div>
      <h1 className={lessStyles.title}>Page products</h1>
      
      <ProductList
        products={productsQuery.data.data}
        onDelete={(id) => {
          productsDeleteMutation.mutate(id);
        }}
      />
    </div>
  );
}