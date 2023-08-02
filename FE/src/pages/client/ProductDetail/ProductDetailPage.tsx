import { Tabs } from "antd";
import { useState } from "react";
import type { TabsProps } from "antd";
import { useParams } from "react-router-dom";

import {
  Breadcrumb,
  Button,
  Container,
  ProductComment,
  ProductDescription,
  ProductInfo,
  ProductList,
} from "../../../components";

import { IFavoriteUser, IProduct } from "../../../interface";

type ProductDetailPageProps = {
  favoriteUser: IFavoriteUser[] | undefined;
  listProducts: IProduct[] | undefined;
};

const ProductDetailPage = ({
  favoriteUser,
  listProducts,
}: ProductDetailPageProps) => {
  const { id } = useParams<string>();
  const [comment, setComment] = useState("");

  const product = listProducts && listProducts.find((prod) => prod._id === id);

  const productSimilar =
    listProducts &&
    listProducts.filter((prod) => prod.category._id === product?.category._id);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <div className="text-black text-xl">Thông tin sản phẩm</div>
        </>
      ),
      children: <ProductDescription />,
    },
    {
      key: "2",
      label: (
        <>
          <div className="text-black text-xl">Bình luận sản phẩm</div>
        </>
      ),
      children:
        product && product.comments.length > 0 ? (
          <ProductComment comments={product.comments} />
        ) : (
          <>
            <div className="text-center p-10">
              <span className="text-gray-500 text-base">
                Không có bình luận
              </span>
            </div>

            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label
                htmlFor="comment"
                className="text-gray-500 text-xl font-medium"
              >
                Bình luận
              </label>

              <textarea
                id="comment"
                value={comment}
                rows={5}
                required
                placeholder="Nhập bình luận của bạn ..."
                onChange={(e) => setComment(e.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 pt-3 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="flex justify-center">
              <div>
                <Button label="Bình luận" onClick={() => alert("Bình luận")} />
              </div>
            </div>
          </>
        ),
    },
  ];

  return (
    <>
      <Container>
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-5 mt-2">
            <Breadcrumb text="Thông tin sản phẩm" />
          </div>

          <div className="flex flex-col gap-6">
            <ProductInfo product={product} favoriteUser={favoriteUser} />

            <ProductList
              products={productSimilar}
              favoriteUser={favoriteUser}
              title="Sản phẩm cùng loại"
            />

            <div className="bg-white rounded-xl p-5">
              <Tabs
                defaultActiveKey="1"
                tabPosition="top"
                items={items}
                size="large"
                type="card"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetailPage;
