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

  return (
    <>
      <Container>
        <Banner />
        {Object.entries(productsBySlug).map(
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
        )}

        <Offer />

        <Features />
      </Container>
    </>
  );
};

export default HomePage;
