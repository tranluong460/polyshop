import { InputNumber, message } from "antd";
import { Link } from "react-router-dom";

import { IItemCart } from "../../../interface";
import { useUpdateCartMutation } from "../../../api/auth";

type CartDrawnItemProps = {
  cartItem: IItemCart;
  cartId: string;
};

const CartDrawnItem = ({ cartItem, cartId }: CartDrawnItemProps) => {
  const [updateCart, resultUpdate] = useUpdateCartMutation();

  const onChange = (value: number | null) => {
    if (value !== null) {
      const data = {
        cartId,
        productId: cartItem.product._id,
        quantity: value,
      };

      updateCart(data)
        .unwrap()
        .then((response) => {
          message.success(response.message);
        })
        .catch(() => {
          message.error("Cập nhật thất bại");
        });
    }
  };

  return (
    <>
      <div className="flex flex-row gap-2 w-full mb-1 border rounded-xl p-2">
        <div className="aspect-square w-auto relative overflow-hidden my-auto">
          <img
            src={cartItem.product.images[0].url}
            width={100}
            height={100}
            alt="Product"
            className="object-cover group-hover:scale-110 transition"
          />
        </div>

        <div className="flex flex-col gap-2 w-2/3">
          <Link
            to={`/product-detail/${cartItem.product._id}`}
            className="font-semibold text-sm break-all truncate hover:text-rose-500"
          >
            {cartItem.product.name}
          </Link>

          <span className="font-bold text-[#ff424e] text-base">
            {cartItem.product.price.toLocaleString("vi-VN")}₫
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs">Số lượng:</span>

            <InputNumber
              min={1}
              disabled={resultUpdate.isLoading}
              max={cartItem.product.inventory}
              defaultValue={cartItem.quantity}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawnItem;
