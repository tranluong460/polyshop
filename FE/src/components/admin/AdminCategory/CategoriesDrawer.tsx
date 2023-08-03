import { Descriptions, Form, Button, Input } from "antd";

import { ICategoryProduct } from "../../../interface";
import { useUpdateCategoriesMutation } from "../../../api/categories";

type CategoriesDrawerProps = {
  cate: ICategoryProduct | undefined;
  isEdit: boolean;
};

const CategoriesDrawer = ({ cate, isEdit }: CategoriesDrawerProps) => {
  const [form] = Form.useForm();
  const [updateCategories, { isLoading }] = useUpdateCategoriesMutation();

  const onFinish = (values: ICategoryProduct) => {
    updateCategories(values);
  };

  return (
    <>
      <Form
        form={form}
        name="DrawerForm"
        onFinish={onFinish}
        initialValues={cate || {}}
        autoComplete="off"
      >
        <Form.Item name="_id" hidden>
          <Input />
        </Form.Item>

        <Descriptions
          extra={
            <Button
              ghost
              type="primary"
              htmlType="submit"
              className={`${isEdit ? "block" : "hidden"}`}
            >
              Lưu
            </Button>
          }
          title={cate?._id}
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Danh mục">
            <Form.Item
              name="slug"
              rules={[
                { required: true, message: "Danh mục không được để trống" },
              ]}
            >
              <Input
                bordered={isEdit}
                readOnly={!isEdit}
                disabled={isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Thương hiệu">
            <Form.Item
              name="brand"
              rules={[
                { required: true, message: "Thương hiệu không được để trống" },
              ]}
            >
              <Input
                bordered={isEdit}
                readOnly={!isEdit}
                disabled={isLoading}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </>
  );
};

export default CategoriesDrawer;
