import { useState, useEffect } from "react";
import { Descriptions, Input, InputNumber, Form, Button, Select } from "antd";

import UploadImage from "./UploadImage";

import { ICategoryProduct, IImageProduct, IProduct } from "../../../interface";
import {
  useAddProductsMutation,
  useUpdateProductsMutation,
} from "../../../api/products";

const { Option } = Select;

type ProductDrawerProps = {
  product: IProduct | undefined;
  listCategories: ICategoryProduct[] | undefined;
  isEdit: boolean;
  isAdd: boolean;
};

type IProductData = {
  _id?: string;
  sold: number;
  stars: number;
  price: number;
  category: string | undefined;
  inventory: number;
  original_price: number;
  name: string;
  description: string;
  images: IImageProduct[] | undefined;
};

const ProductDrawer = ({
  product,
  listCategories,
  isEdit,
  isAdd,
}: ProductDrawerProps) => {
  const [form] = Form.useForm();
  const [selectedSlug, setSelectedSlug] = useState("");
  const [images, setImages] = useState<IImageProduct[]>([]);
  const [addProducts, resultAdd] = useAddProductsMutation();
  const [updateProducts, resultUpdate] = useUpdateProductsMutation();

  const onFinish = (values: IProduct) => {
    const matchingCategory = listCategories?.find((category) => {
      if (typeof values.category === "object" && values.category !== null) {
        return (
          category.slug === values.category.slug &&
          category.brand === values.category.brand
        );
      }
      return false;
    });

    let category;

    if (matchingCategory) {
      category = matchingCategory._id;
    }

    const newValues: IProductData = {
      ...values,
      category,
      images,
    };

    if (isEdit === true && isAdd === false) {
      updateProducts(newValues);
    }
    if (isEdit === true && isAdd === true) {
      addProducts(newValues);
    }
  };

  const handleImageChange = (newFileList: IImageProduct[]) => {
    setImages(newFileList);
  };

  const handleSlugChange = (value: string) => {
    setSelectedSlug(value);
  };

  const uniqueSlugs: { [slug: string]: boolean } = {};
  const slug = listCategories
    ?.filter((category) => {
      if (!uniqueSlugs[category.slug]) {
        uniqueSlugs[category.slug] = true;
        return true;
      }
      return false;
    })
    .map((category) => ({
      label: category.slug,
      value: category.slug,
    }));

  const brand: { [key: string]: string[] } = {};
  listCategories?.forEach((category) => {
    if (!brand[category.slug]) {
      brand[category.slug] = [];
    }
    brand[category.slug].push(category.brand);
  });

  useEffect(() => {
    if (selectedSlug) {
      const updatedCategory = {
        ...form.getFieldValue("category"),
        slug: selectedSlug,
        brand: null,
      };
      form.setFieldsValue({ category: updatedCategory });
    }
  }, [selectedSlug, form]);

  return (
    <>
      <Form
        form={form}
        name="DrawerForm"
        onFinish={onFinish}
        initialValues={product || {}}
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
          title={product?._id}
          bordered
          column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Tên" span={2}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Tên không được để trống" }]}
            >
              <Input.TextArea
                rows={3}
                bordered={isEdit}
                readOnly={!isEdit}
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Danh mục">
            <Form.Item
              name={["category", "slug"]}
              rules={[
                { required: true, message: "Danh mục không được để trống" },
              ]}
            >
              <Select
                options={slug}
                onChange={handleSlugChange}
                bordered={isEdit}
                className={`mt-5
                ${isEdit ? "" : "pointer-events-none"}
                `}
                suffixIcon={!isEdit ? null : undefined}
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Thương hiệu">
            <Form.Item
              name={["category", "brand"]}
              rules={[
                { required: true, message: "Thương hiệu không được để trống" },
              ]}
            >
              <Select
                disabled={
                  (isEdit &&
                    !form.getFieldValue(["category", "slug"]) &&
                    resultUpdate.isLoading) ||
                  resultAdd.isLoading
                }
                bordered={isEdit}
                suffixIcon={!isEdit ? null : undefined}
                className={`mt-5
                ${isEdit ? "" : "pointer-events-none"}
                `}
              >
                {(brand[form.getFieldValue(["category", "slug"])] || []).map(
                  (item) => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Giá">
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Giá không được để trống" }]}
            >
              <InputNumber
                min={0}
                max={999999999}
                className="mt-5"
                bordered={isEdit}
                readOnly={!isEdit}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Giá gốc">
            <Form.Item
              name="original_price"
              rules={[
                { required: true, message: "Giá gốc không được để trống" },
              ]}
            >
              <InputNumber
                min={0}
                max={999999999}
                className="mt-5"
                bordered={isEdit}
                readOnly={!isEdit}
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Đã bán">
            <Form.Item name="sold">
              <InputNumber
                className="mt-5"
                readOnly={true}
                bordered={isEdit}
                style={{ width: "100%" }}
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Hàng tồn kho">
            <Form.Item
              name="inventory"
              rules={[
                { required: true, message: "Số lượng không được để trống" },
              ]}
            >
              <InputNumber
                min={0}
                max={9999999}
                className="mt-5"
                bordered={isEdit}
                readOnly={!isEdit}
                style={{ width: "100%" }}
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>

          <Descriptions.Item label="Mô tả">
            <Form.Item
              name="description"
              rules={[{ required: true, message: "Mô tả không được để trống" }]}
            >
              <Input.TextArea
                rows={6}
                bordered={isEdit}
                readOnly={!isEdit}
                disabled={resultUpdate.isLoading || resultAdd.isLoading}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          layout="vertical"
          className="mt-5"
          title={"Hình ảnh sản phẩm"}
          column={{ xxl: 6, xl: 5, lg: 4, md: 3, sm: 4, xs: 3 }}
        >
          <Descriptions.Item>
            <Form.Item
              name="images"
              rules={[
                { required: false, message: "Hình ảnh không được để trống" },
              ]}
            >
              <UploadImage
                isEdit={isEdit}
                listImage={product?.images || images || []}
                handleImageChange={handleImageChange}
              />
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
      </Form>
    </>
  );
};

export default ProductDrawer;
