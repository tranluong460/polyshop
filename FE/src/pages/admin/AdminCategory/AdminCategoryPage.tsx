import { ICategoryProduct } from "../../../interface";
import { useEffect, useState } from "react";
import { Drawer, message } from "antd";

import { CategoriesDrawer, CategoriesTable } from "../../../components";
import { useDeleteCategoriesMutation } from "../../../api/categories";

type AdminCategoryProps = {
  listCategories: ICategoryProduct[] | undefined;
};

const AdminCategoryPage = ({ listCategories }: AdminCategoryProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [cate, setCategories] = useState<ICategoryProduct | undefined>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const key = "delete";

  const [deleteCategories, resultDelete] = useDeleteCategoriesMutation();

  const remove = (_id: string) => {
    deleteCategories(_id);
  };

  const onCancel = () => {
    setIsAdd(false);
    setIsEdit(false);
    setOpenDrawer(false);
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
      });
    }
    if (resultDelete.isError) {
      messageApi.open({
        key,
        type: "error",
        content: "Đã có lỗi xảy ra!",
      });
    }
  }, [resultDelete, messageApi]);

  useEffect(() => {
    const fetchListCategories = listCategories?.find(
      (category) => category._id === selectedId
    );
    setCategories(fetchListCategories);
  }, [selectedId, listCategories]);

  return (
    <>
      {contextHolder}

      <Drawer
        size="large"
        placement="right"
        key={cate?._id}
        onClose={onCancel}
        getContainer={false}
        open={openDrawer || isEdit || isAdd}
        title={
          isAdd
            ? "Cập nhật danh mục"
            : isEdit
            ? "Chỉnh sửa danh mục"
            : "Thông tin chi tiết"
        }
      >
        <CategoriesDrawer cate={cate} isEdit={isEdit} isAdd={isAdd} />
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
