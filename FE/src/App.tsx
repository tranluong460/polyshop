import { useEffect, useState } from "react";
import { message } from "antd";
import { BrowserRouter, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

import {
  AdminCategoryPage,
  AdminDashboardPage,
  AdminProductPage,
  AdminUserPage,
  BaseAdmin,
  BaseAuth,
  BaseClient,
  CheckoutPage,
  ContactPage,
  ErrorPage,
  FaqPage,
  ForgotPage,
  HomePage,
  IntroducePage,
  ListProductPage,
  LoginPage,
  ProductDetailPage,
  ProfilePage,
  RegisterPage,
  ResetPage,
} from "./pages";

import {
  Account,
  ListCard,
  ChangePassword,
  Favorite,
  Information,
  Order,
  OrderAddress,
  Payment,
  Loading,
} from "./components";

import { ICart, IProduct, IUser } from "./interface";

import { useGetAllProductsQuery, useSearchProductByCateMutation, useSearchProductMutation } from "./api/products";
import { useGetAllCategoriesQuery } from "./api/categories";
import { useGetUserByTokenMutation } from "./api/auth";
import { useSelector } from "react-redux";

function App() {
  const { data: products } = useGetAllProductsQuery();
  const { data: categories } = useGetAllCategoriesQuery();
  const [getUser, resultGet] = useGetUserByTokenMutation();
  const [searchPro] = useSearchProductMutation()
  const token = localStorage.getItem("token");

  const listProducts = products?.data;
  const listCategories = categories?.data;
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [pro, setPro] = useState<IProduct[]>([])

  const [cart, setCart] = useState<ICart | null>(null);
  const searchTerm = useSelector((state: any) => state.search.searchTerm);

  useEffect(() => {
    if (token) {
      getUser(token)
        .unwrap()
        .then((response) => {
          setCurrentUser(response?.data);
        })
        .catch((error) => {
          message.error(error.data.message);
        });
    }
  }, [getUser, token]);
  useEffect(() => {
    if (searchTerm) {
      searchPro({ name: searchTerm })
        .unwrap()
        .then((res) => {
          setPro(res.data);
        })

    }
  }, [searchTerm]);
  if (resultGet.isLoading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <BaseClient
                cart={cart}
                currentUser={currentUser}
                listCategories={listCategories}
              />
            }
          >
            <Route
              index
              element={
                <HomePage
                  favoriteUser={currentUser?.favorites}
                  listProducts={listProducts}
                  listCategories={listCategories}
                />
              }
            />
            <Route path="faq" element={<FaqPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route
              path="profile"
              element={
                <ProfilePage
                  nameUser={currentUser?.name}
                  imageUser={currentUser?.image?.url}
                />
              }
            >
              <Route index element={<Account currentUser={currentUser} />} />
              <Route
                path="account"
                element={<Account currentUser={currentUser} />}
              />
              <Route
                path="information"
                element={<Information currentUser={currentUser} />}
              />
              <Route
                path="change-password"
                element={<ChangePassword emailUser={currentUser?.email} />}
              />
              <Route path="orders" element={<Order />} />
              <Route path="order-address" element={<OrderAddress />} />
              <Route path="payment" element={<Payment />} />
              <Route
                path="favorite"
                element={<Favorite favorites={currentUser?.favorites} />}
              />
              <Route path="list-card" element={<ListCard />} />
            </Route>
            <Route
              path="checkout"
              element={
                <CheckoutPage cardUser={currentUser?.cards} cart={cart} />
              }
            />
            <Route path="introduce" element={<IntroducePage />} />
            <Route
              path="list-product"
              element={
                <ListProductPage
                  favoriteUser={currentUser?.favorites}
                  listProducts={listProducts}
                  listCategories={listCategories}
                />
              }
            />
            <Route
              path="product-detail/:id"
              element={
                <ProductDetailPage
                  favoriteUser={currentUser?.favorites}
                  listProducts={listProducts}
                  userId={currentUser?._id}
                />
              }
            />
            <Route
              path="product/:name"
              element={
                <HomePage
                  favoriteUser={currentUser?.favorites}
                  listProducts={pro}
                  listCategories={listCategories}
                />
              }

            />
          </Route>

          <Route path="/auth" element={<BaseAuth />}>
            <Route index element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="forgot" element={<ForgotPage />} />
            <Route
              path="reset-password/:randomString"
              element={<ResetPage />}
            />
          </Route>

          <Route
            path="/admin"
            element={
              resultGet.isLoading ? (
                <>
                  <div className="flex items-center justify-center h-screen">
                    <Loading />
                  </div>
                </>
              ) : (
                <>
                  {resultGet.isLoading === false &&
                    currentUser &&
                    currentUser?.role === "Admin" ? (
                    <BaseAdmin />
                  ) : (
                    <ErrorPage />
                  )}
                </>
              )
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route
              path="products"
              element={
                <AdminProductPage
                  listProducts={listProducts}
                  listCategories={listCategories}
                />
              }
            />
            <Route
              path="categories"
              element={<AdminCategoryPage listCategories={listCategories} />}
            />
            <Route path="users" element={<AdminUserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
