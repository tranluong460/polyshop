import { useState } from "react";

import {
  Breadcrumb,
  CheckoutCard,
  CheckoutDelivery,
  CheckoutOrder,
  Container,
} from "../../../components";

import { ICardUser } from "../../../interface";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
  useGetCartByUserQuery,
} from "../../../api/auth";
import { message } from "antd";

type CheckoutPageProps = {
  cardUser: ICardUser[] | undefined;
};

const CheckoutPage = ({ cardUser }: CheckoutPageProps) => {
  const { data } = useGetCartByUserQuery();
  const cart = data?.cart;

  const [active, setActive] = useState("Thanh toán bằng thẻ");
  const cardMain = cardUser && cardUser.find((card) => card.main === true);

  const [createOrder, resultCreate] = useCreateOrderMutation();
  const [createPayment] = useCreatePaymentMutation();

  const totalPrice = cart?.products?.reduce((total: number, products: any) => {
    const productPrice = products?.product?.price;
    return total + productPrice * products?.quantity;
  }, 0);

  const toggleActive = (text: string) => {
    setActive(text);
  };

  const handleOrder = () => {
    const data = { totalPrice, paymentMethod: active };
    createOrder(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const handlePayment = (
    cardHolderName: string,
    cardNumber: number | string,
    startDate: string,
    endDate: string,
    cvv: string | number
  ) => {
    const data = { totalPrice, paymentMethod: active };
    createOrder(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        if (active === "Thanh toán bằng thẻ") {
          const expirationDate = `${startDate}/${endDate}`;
          const dataPayment = {
            orderId: response.order._id,
            cardHolderName,
            cardNumber,
            expirationDate,
            cvv,
          };
          createPayment(dataPayment);
        }
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  const paymentMethod = [
    {
      name: "Thanh toán bằng thẻ",
      image: "/images/payment/payment-method-1.png",
    },
    {
      name: "Paypal",
      image: "/images/payment/payment-method-2.png",
    },
    {
      name: "Thanh toán khi nhận hàng",
      image: "/images/payment/payment-method-3.png",
    },
  ];

  return (
    <>
      <Container>
        <Breadcrumb text="Thanh toán" />

        <div className="bg-white rounded-xl p-5 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-base font-medium pl-6 bg-gray-200 rounded p-3">
                Chọn phương thức thanh toán
              </h4>
              <div className="mt-10 flex flex-row gap-5">
                {paymentMethod.map((method) => (
                  <div
                    key={method.name}
                    className={`p-3 cursor-pointer rounded text-center flex flex-col items-center w-[150px]
                  ${
                    active === method.name ? "border border-rose-500" : "border"
                  }
                  `}
                    onClick={() => toggleActive(method.name)}
                  >
                    <div className="flex justify-center mb-2 h-16 items-center">
                      <img src={method.image} alt={method.image} />
                    </div>

                    <p className="text-base text-gray-500">{method.name}</p>
                  </div>
                ))}
              </div>

              {active === "Thanh toán bằng thẻ" && (
                <CheckoutCard
                  cardMain={cardMain}
                  title="Thẻ ngân hàng"
                  onClick={handlePayment}
                  disabled={resultCreate.isLoading}
                />
              )}

              {active === "Thanh toán khi nhận hàng" && (
                <CheckoutDelivery
                  title="Thanh toán khi nhận hàng"
                  onClick={handleOrder}
                  disabled={resultCreate.isLoading}
                />
              )}
            </div>

            <div className="col-span-1">
              <CheckoutOrder cart={cart} totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CheckoutPage;
