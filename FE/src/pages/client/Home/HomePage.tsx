import { useEffect, useState } from "react";

import {
  Banner,
  Container,
  Features,
  Offer,
  ProductList,
} from "../../../components";

import { ICategoryProduct, IFavoriteUser, IProduct } from "../../../interface";

type HomePageProps = {
  favoriteUser: IFavoriteUser[] | undefined;
  listProducts: IProduct[] | undefined;
  listCategories: ICategoryProduct[] | undefined;
};

const HomePage = ({
  favoriteUser,
  listProducts,
  listCategories,
}: HomePageProps) => {
  const [productsBySlug, setProductsBySlug] = useState<{
    [slug: string]: IProduct[];
  }>({});

  useEffect(() => {
    if (listCategories && listProducts) {
      const initialProductsBySlug: { [slug: string]: IProduct[] } = {};

      listCategories.forEach((category) => {
        const filteredProducts = listProducts.filter(
          (product) => product.category.slug === category.slug
        );

        initialProductsBySlug[category.slug] = filteredProducts;
      });

      setProductsBySlug(initialProductsBySlug);
    }
  }, [listCategories, listProducts]);
  // console.log(listProducts);
  return (
    <>
      <Container>
        <Banner />
        {listProducts?.length > 0 ? Object.entries(productsBySlug).map(
          ([slug, products]) =>
            products.length > 0 && (
              <ProductList
                middle
                key={slug}
                title={slug}
                products={products}
                favoriteUser={favoriteUser}
              />
            )
        ) : <div className="m-6"><h1 className="text-center font-semibold text-2xl">Sản phẩm không tồn tại</h1></div>}

        <Offer />

        <Features />
      </Container>
    </>
  );
};

export default HomePage;
