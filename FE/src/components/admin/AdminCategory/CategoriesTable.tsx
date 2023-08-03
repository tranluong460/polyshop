import type { ColumnsType } from "antd/es/table";
import { Table, Tooltip, Button, Space, Popconfirm } from "antd";

import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

import { ICategoryProduct } from "../../../interface";

type ProductTableProps = {
  isLoading: boolean;
  listCategories: ICategoryProduct[] | undefined;
  onAction: (_id: string, action: string) => void;
};

const CategoriesTable = ({
  onAction,
  isLoading,
  listCategories,
}: ProductTableProps) => {
  const columns: ColumnsType<ICategoryProduct> = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      align: "left",
      render: (_id) => (
        <button
          className="hover:text-rose-500"
          onClick={() => onAction(_id, "watch")}
        >
          <Tooltip placement="top" title="Ấn để xem thông tin chi tiết">
            {_id}
          </Tooltip>
        </button>
      ),
    },
    {
      title: "Tên danh mục ",
      dataIndex: "slug",
      key: "slug",
      align: "left",
      ellipsis: true,
      responsive: ["md"],
      render: (name) => (
        <Tooltip placement="top" title={name}>
          {name}
        </Tooltip>
      ),
      sorter: (a, b) => a.slug.length - b.slug.length,
    },
    {
      title: "Tên thương hiệu ",
      dataIndex: "brand",
      key: "brand",
      align: "left",
      ellipsis: true,
      responsive: ["md"],
      render: (name) => (
        <Tooltip placement="top" title={name}>
          {name}
        </Tooltip>
      ),
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Thao tác",
      dataIndex: "_id",
      key: "_id",
      align: "center",
      width: "10%",
      render: (_id) => (
        <>
          <Space wrap>
            <Button
              ghost
              type="primary"
              size="middle"
              onClick={() => onAction(_id, "update")}
              icon={<AiOutlineEdit size={20} />}
            />

            <Popconfirm
              okType="danger"
              okText="Đồng ý"
              cancelText="Hủy"
              onConfirm={() => onAction(_id, "delete")}
              placement="topRight"
              title="Xóa danh mục?"
              description="Bạn có chắc chắn xóa danh mục này không?"
              icon={
                <AiOutlineQuestionCircle
                  size={20}
                  className="text-rose-500 mr-1 mt-0.5"
                />
              }
            >
              <Button
                danger
                size="middle"
                type="primary"
                icon={<AiOutlineDelete size={20} />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <Button
            ghost
            type="primary"
            size="middle"
            onClick={() => onAction("", "add")}
          >
            Thêm
          </Button>
        )}
        bordered
        rowKey="_id"
        size="middle"
        columns={columns}
        scroll={{ y: 350 }}
        loading={isLoading}
        tableLayout="auto"
        dataSource={listCategories || []}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
};

export default CategoriesTable;
