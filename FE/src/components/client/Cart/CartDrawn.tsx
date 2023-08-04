import { Drawer } from "antd";
import { useNavigate } from "react-router-dom";

import Button from "../../Button";
import CartDrawnItem from "./CartDrawnItem";

import { ICart, IUser } from "../../../interface";

type CartDrawnProps = {
  isOpen: boolean;
  currentUser: IUser | null;
  cart: ICart | null;
  onClose: () => void;
};

const CartDrawn = ({ currentUser, isOpen, onClose, cart }: CartDrawnProps) => {
  const navigate = useNavigate();

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
            cart.products.map((cartItem) => (
              <CartDrawnItem key={cartItem.product._id} cartItem={cartItem} />
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
                <span className="text-gray-500">10%</span>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Tổng phụ:</span>
                <span className="text-gray-500">
                  {(cart &&
                    cart.totalPrice &&
                    cart.totalPrice.toLocaleString("vi-VN")) ||
                    0}
                  ₫
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
