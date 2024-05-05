import { Radio } from "antd";
import { useEffect, useState } from "react";
import { RadioChangeEvent } from "antd/es/radio";

import { ICategoryProduct } from "../../../../interface";

type FilterProductProps = {
  categories: ICategoryProduct[] | undefined;
};

const FilterProduct = ({ categories }: FilterProductProps) => {
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [listSlug, setListSlug] = useState<string[]>([]);
  const [listBrandBySlug, setListBrandBySlug] = useState<
    ICategoryProduct[] | undefined
  >(
    categories &&
      categories?.filter((category) => category.slug.includes("Điện thoại"))
  );

  const onChangeSlug = (e: RadioChangeEvent) => {
    setSlug(e.target.value);

    const filterBrandBySlug =
      categories &&
      categories?.filter((category) => category.slug.includes(e.target.value));

    setListBrandBySlug(filterBrandBySlug);
  };

  const onChangeBrand = (e: RadioChangeEvent) => {
    setBrand(e.target.value);
  };

  useEffect(() => {
    const initialSlug = [
      ...new Set(categories && categories?.map((category) => category.slug)),
    ];

    setListSlug(initialSlug);
  }, [categories]);

  return (
    <>
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium mt-3">
          Danh mục
        </h3>

        <div className="space-y-2">
          <Radio.Group
            onChange={onChangeSlug}
            value={slug}
            className="flex flex-col gap-1"
          >
            {listSlug?.map((item) => (
              <Radio key={item} value={item}>
                <div className="text-gray-600 cursor-pointer">{item}</div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </div>

      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium mt-3">
          Thương hiệu
        </h3>

        <div className="space-y-2">
          <Radio.Group
            onChange={onChangeBrand}
            value={brand}
            className="flex flex-col gap-1"
          >
            {listBrandBySlug &&
              listBrandBySlug.map((brand) => (
                <Radio key={brand._id} value={brand.brand}>
                  <div className="text-gray-600 cursor-pointer">
                    {brand.brand}
                  </div>
                </Radio>
              ))}
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
