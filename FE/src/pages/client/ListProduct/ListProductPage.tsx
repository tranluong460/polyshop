import {
  Breadcrumb,
  Container,
  FilterProduct,
  ProductList,
  SelectProduct,
} from "../../../components";

import { ICategoryProduct, IFavoriteUser, IProduct } from "../../../interface";

type ListProductPageProps = {
  favoriteUser: IFavoriteUser[] | undefined;
  listProducts: IProduct[] | undefined;
  listCategories: ICategoryProduct[] | undefined;
};

// Khởi tạo component
const ListProductPage = ({
  favoriteUser,
  listProducts,
  listCategories,
}: ListProductPageProps) => {
  return (
    <>
      <div className="py-3">
        <Container>
          <Breadcrumb text="Danh sách sản phẩm" />

          <div className="flex gap-3 pt-5">
            <div className="col-span-1 hidden md:block bg-white px-4 pb-6 shadow-2xl rounded-xl overflow-hidden w-1/3">
              <div className="divide-y divide-gray-200 space-y-5">
                <FilterProduct categories={listCategories} />
              </div>
            </div>

            <div className="col-span-3">
              <select className="text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-2xl rounded-xl focus:ring-rose-500 focus:border-rose-500 mb-3 outline-none hidden md:block">
                <option value="default">Mặc định</option>
                <option value="newest">Sản phẩm mới</option>
                <option value="esc">Giá từ thấp đến cao</option>
                <option value="desc">Giá từ cao đến thấp</option>
              </select>

              <div className="block md:hidden w-full mb-5">
                <SelectProduct categories={listCategories} />
              </div>

              <div className="shadow-2xl rounded-xl">
                <ProductList
                  small
                  products={listProducts}
                  favoriteUser={favoriteUser}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ListProductPage;
