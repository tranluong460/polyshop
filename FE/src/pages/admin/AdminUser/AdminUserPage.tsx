import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useGetAllUserQuery } from "../../../api/auth";
import { IUser } from "../../../interface";

const columns: ColumnsType<IUser> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    key: "role",
    dataIndex: "role",
    render: (role) => (
      <>
        {role === "Admin" ? (
          <Tag color="red">{role.toUpperCase()}</Tag>
        ) : (
          <Tag color="blue">{role.toUpperCase()}</Tag>
        )}
      </>
    ),
  },
];

const AdminUserPage = () => {
  const { data, isLoading } = useGetAllUserQuery();
  const dataUser = data?.data;

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUser}
        rowKey="_id"
        bordered
        size="middle"
        loading={isLoading}
        tableLayout="auto"
      />
    </>
  );
};

export default AdminUserPage;
