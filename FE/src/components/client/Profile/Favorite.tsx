import { ProductList } from "../..";

import { IFavoriteUser, IProduct } from "../../../interface";

type FavoriteProps = {
  favorites: IFavoriteUser[] | undefined;
  listProducts: IProduct[] | undefined;
};

const Favorite = ({ favorites, listProducts }: FavoriteProps) => {
  const favoriteProducts =
    listProducts && favorites
      ? listProducts.filter((product) => {
          return favorites.some((fav) => {
            return product._id === fav.productId;
          });
        })
      : [];

  return (
    <>
      <div className="p-3 bg-white rounded-xl">
        {favoriteProducts.length > 0 ? (
          <>
            <div className="text-center p-5">
              <h4 className="text-xl font-semibold">Danh sách yêu thích</h4>
            </div>

            <ProductList
              small
              products={favoriteProducts}
              favoriteUser={favorites}
            />
          </>
        ) : (
          <div className="text-center">Không có sản phẩm</div>
        )}
      </div>
    </>
  );
};

export default Favorite;
