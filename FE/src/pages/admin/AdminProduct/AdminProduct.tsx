import { useEffect, useState } from "react";
import {
  Drawer,
  //  message
} from "antd";

import { ProductDrawer, ProductTable } from "../../../components";
import { ICategoryProduct, IProduct } from "../../../interface";

type AdminProductProps = {
  listProducts: IProduct[] | undefined;
  listCategories: ICategoryProduct[] | undefined;
};

const AdminProductPage = ({
  listProducts,
  listCategories,
}: AdminProductProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [product, setProduct] = useState<IProduct | undefined>();
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [messageApi, contextHolder] = message.useMessage();

  const onCancel = () => {
    setIsEdit(false);
    setOpenDrawer(false);
  };

  const onAction = (_id: string, action: string) => {
    action === "watch"
      ? setOpenDrawer(true)
      : action === "update"
      ? setIsEdit(true)
      : action === "delete"
      ? "action delete"
      : null;

    setSelectedId(_id);
  };

  // const onSuccessAction = (action: string) => {
  //   const key = action === "update" ? "update" : "delete";

  //   messageApi.open({
  //     key,
  //     type: "loading",
  //     content: "Vui lòng chờ",
  //   });

  //   setTimeout(() => {
  //     messageApi.open({
  //       key,
  //       type: "success",
  //       content: "Thành công",
  //       duration: 2,
  //     });
  //   }, 2000);
  // };

  useEffect(() => {
    const fetchProduct = listProducts?.find(
      (product) => product._id === selectedId
    );
    setProduct(fetchProduct);
  }, [selectedId, listProducts]);

  return (
    <>
      {/* {contextHolder} */}

      <Drawer
        size="large"
        placement="right"
        key={product?._id}
        onClose={onCancel}
        getContainer={false}
        open={openDrawer || isEdit}
        title={`${isEdit ? "Cập nhật thông tin" : "Thông tin chi tiết"}`}
      >
        <ProductDrawer
          product={product}
          listCategories={listCategories}
          isEdit={isEdit}
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
