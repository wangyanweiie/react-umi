import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  id: string;
  name: string;
}

/**
 * 产品列表
 * @param products 产品列表数据
 * @param onDelete 删除事件
 * @returns 
 */
const ProductList: React.FC<{
  products: DataType[];
  onDelete: (id: string) => void
}> = ({
  products,
  onDelete,
}) => {
  // 表格列配置
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      render(text: Record<string, string>, record: Record<string, string>) {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  
  return <Table rowKey="id" dataSource={products} columns={columns} />;
};

export default ProductList;