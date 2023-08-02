import { ICategoryProduct } from "../../../interface";
import { useEffect, useState } from "react";
import {
  Drawer,
  //  message
} from "antd";

import { CategoriesDrawer, CategoriesTable } from "../../../components";

type AdminCategoryProps = {
  listCategories: ICategoryProduct[] | undefined;
};

const AdminCategoryPage = ({ listCategories }: AdminCategoryProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [cate, setCategories] = useState<ICategoryProduct | undefined>();
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
  useEffect(() => {
    const fetchListCategories = listCategories?.find(
      (category) => category._id === selectedId
    );
    setCategories(fetchListCategories);
  }, [selectedId, listCategories]);

  return (
    <>
      {/* {contextHolder} */}

      <Drawer
        size="large"
        placement="right"
        key={cate?._id}
        onClose={onCancel}
        getContainer={false}
        open={openDrawer || isEdit}
        title={`${isEdit ? "Cập nhật thông tin" : "Thông tin chi tiết"}`}
      >
        <CategoriesDrawer cate={cate} isEdit={isEdit} />
      </Drawer>

      <CategoriesTable
        isLoading={openDrawer}
        listCategories={listCategories}
        onAction={onAction}
      />
    </>
  );
};

export default AdminCategoryPage;
