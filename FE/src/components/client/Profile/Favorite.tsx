import { Loading, ProductList } from "../..";
import { useGetFavoritesByUserQuery } from "../../../api/auth";
import { IFavoriteUser } from "../../../interface";

type FavoriteProps = {
  favorites: IFavoriteUser[] | undefined;
};

const Favorite = ({ favorites }: FavoriteProps) => {
  const { data: listFavorites, isLoading } = useGetFavoritesByUserQuery();
  const favoriteProducts = listFavorites?.listProducts;

  return (
    <>
      <div className="p-3 bg-white rounded-xl">
        {isLoading ? (
          <>
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          </>
        ) : (
          <>
            {favoriteProducts && favoriteProducts.length > 0 ? (
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
          </>
        )}
      </div>
    </>
  );
};

export default Favorite;
