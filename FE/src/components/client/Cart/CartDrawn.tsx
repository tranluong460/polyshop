import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";

import Button from "../../Button";
import CartDrawnItem from "./CartDrawnItem";

import { IUser } from "../../../interface";
import { useGetCartByUserQuery } from "../../../api/auth";

type CartDrawnProps = {
  isOpen: boolean;
  currentUser: IUser | null;
  onClose: () => void;
};

const CartDrawn = ({ currentUser, isOpen, onClose }: CartDrawnProps) => {
  const navigate = useNavigate();

  const { data } = useGetCartByUserQuery();
  const cart = data?.cart;

  const totalPrice = cart?.products?.reduce((total: any, products: any) => {
    const productPrice = products?.product?.price;
    return total + productPrice * products?.quantity;
  }, 0);

  return (
    <>
      <Drawer
        title="Giỏ hàng"
        placement="right"
        onClose={onClose}
        open={isOpen}
      >
        <div className="h-[65vh] overflow-y-auto">
          {cart && cart.products && cart.products.length > 0 ? (
            cart.products.map((cartItem: any) => (
              <CartDrawnItem
                key={cartItem.product._id}
                cartItem={cartItem}
                cartId={cart._id}
              />
            ))
          ) : (
            <div className="flex justify-center">
              <span>Không có sản phẩm nào trong giỏ hàng</span>
            </div>
          )}
        </div>

        <div className="absolute left-0 bottom-0 w-full border-t p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="font-bold">Giảm giá:</span>
                <span className="text-gray-500">0%</span>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Tổng phụ:</span>
                <span className="text-gray-500">
                  {totalPrice ? totalPrice.toLocaleString("vi-VN") : 0}₫
                </span>
              </div>
            </div>

            <Button
              label="Thanh toán"
              disabled={!currentUser}
              onClick={() => navigate("/checkout")}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartDrawn;
