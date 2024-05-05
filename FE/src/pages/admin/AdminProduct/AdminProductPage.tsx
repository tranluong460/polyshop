import { useEffect, useState } from "react";
import { Drawer, message } from "antd";

import { ProductDrawer, ProductTable } from "../../../components";
import { ICategoryProduct, IProduct } from "../../../interface";
import { useDeleteProductsMutation } from "../../../api/products";

type AdminProductProps = {
  listProducts: IProduct[] | undefined;
  listCategories: ICategoryProduct[] | undefined;
};

const AdminProductPage = ({
  listProducts,
  listCategories,
}: AdminProductProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [product, setProduct] = useState<IProduct | undefined>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const key = "delete";

  const [deleteProducts, resultDelete] = useDeleteProductsMutation();

  const onCancel = () => {
    setIsAdd(false);
    setIsEdit(false);
    setOpenDrawer(false);
  };

  const remove = (_id: string) => {
    deleteProducts(_id);
  };

  const onAction = (_id: string, action: string) => {
    action === "watch"
      ? setOpenDrawer(true)
      : action === "update"
      ? setIsEdit(true)
      : action === "add"
      ? (setIsAdd(true), setIsEdit(true))
      : action === "delete"
      ? remove(_id)
      : null;

    setSelectedId(_id);
  };

  useEffect(() => {
    if (resultDelete.isLoading) {
      messageApi.open({
        key,
        type: "loading",
        content: "Loading...",
      });
    }
    if (resultDelete.isSuccess) {
      messageApi.open({
        key,
        type: "success",
        content: "Xóa thành công!",
        duration: 2,
      });
    }
    if (resultDelete.isError) {
      messageApi.open({
        key,
        type: "error",
        content: "Đã có lỗi xảy ra!",
        duration: 2,
      });
    }
  }, [resultDelete, messageApi]);

  useEffect(() => {
    const fetchProduct = listProducts?.find(
      (product) => product._id === selectedId
    );
    setProduct(fetchProduct);
  }, [selectedId, listProducts]);

  return (
    <>
      {contextHolder}

      <Drawer
        size="large"
        placement="right"
        key={product?._id}
        onClose={onCancel}
        getContainer={false}
        open={openDrawer || isEdit || isAdd}
        title={`${
          isAdd
            ? "Cập nhật sản phẩm"
            : isEdit
            ? "Chỉnh sửa sản phẩm"
            : "Thông tin chi tiết"
        }`}
      >
        <ProductDrawer
          product={product}
          listCategories={listCategories}
          isEdit={isEdit}
          isAdd={isAdd}
        />
      </Drawer>

      <ProductTable
        isLoading={openDrawer}
        listProducts={listProducts}
        onAction={onAction}
      />
    </>
  );
};

export default AdminProductPage;
