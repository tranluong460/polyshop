import { useState } from "react";
import { TreeSelect } from "antd";

import { ICategoryProduct } from "../../../../interface";

type SelectProductProps = {
  categories: ICategoryProduct[] | undefined;
};

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Danh mục",
    value: "Danh mục",
    key: "Danh mục",
    children: [
      {
        title: "Điện thoại",
        value: "Điện thoại",
        key: "Điện thoại",
      },
      {
        title: "Máy tính sách tay",
        value: "Máy tính sách tay",
        key: "Máy tính sách tay",
      },
      {
        title: "Đồng hồ",
        value: "Đồng hồ",
        key: "Đồng hồ",
      },
    ],
  },
  {
    title: "Thương hiệu",
    value: "Thương hiệu",
    key: "Thương hiệu",
    children: [
      {
        title: "Iphone",
        value: "Iphone",
        key: "Iphone",
      },
      {
        title: "Samsung",
        value: "Samsung",
        key: "Samsung",
      },
      {
        title: "Nokia",
        value: "Nokia",
        key: "Nokia",
      },
    ],
  },
];

const SelectProduct = ({ categories }: SelectProductProps) => {
  const [value, setValue] = useState<string[]>([]);

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const tProps = {
    value,
    treeData,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Vui lòng chọn",
    style: {
      width: "100%",
    },
  };

  return (
    <>
      <TreeSelect {...tProps} />
    </>
  );
};

export default SelectProduct;
