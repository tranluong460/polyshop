// Import các component
import ProductCard from "./ProductCard";

// Import các interface
import { IFavoriteUser, IProduct } from "../../../../interface";
import { useGetAllProductsQuery } from "../../../../api/products";

// Type để truyền dữ liệu giữa các props
type ProductListProps = {
  products?: IProduct[] | undefined;
  favoriteUser?: IFavoriteUser[] | undefined;
  title?: string;
  small?: boolean;
  middle?: boolean;
  large?: boolean;
};

// Khởi tạo component
const ProductList = ({
  small,
  middle,
  large,
  title,
  products,
  favoriteUser,
}: ProductListProps) => {
  return (
    <>
      <div className="space-y-4 rounded-xl p-5 mb-8 bg-white">
        {title && (
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-x-7 gap-y-10
          ${small &&
            "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
            }
          ${middle &&
            "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            }
          ${large &&
            "sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
            }
         ${!small &&
            !middle &&
            !large &&
            " sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            }
          `}
        >
          {products &&
            products.map((product: IProduct) => (
              <ProductCard
                key={product._id}
                product={product}
                favoriteUser={favoriteUser}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
