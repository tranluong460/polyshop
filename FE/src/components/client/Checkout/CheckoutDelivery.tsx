import { Button } from "../..";

type CheckoutDeliveryProps = {
  title: string;
  onClick: () => void;
  disabled: boolean;
};

const CheckoutDelivery = ({
  disabled,
  title,
  onClick,
}: CheckoutDeliveryProps) => {
  return (
    <>
      <div className="bg-gray-100 rounded-xl p-5 mt-10">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-xl">{title}</h4>

          <div className="flex flex-row">
            <div className="col-span-1">
              <img
                src="/images/payment/payment-method-3.png"
                alt="Credit-card"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-5 text-center">
          <span className="text-gray-500">
            Bạn có thể thanh toán bằng tiền mặt cho người chuyển phát nhanh của
            chúng tôi khi bạn nhận hàng.
          </span>

          <div className="flex justify-center">
            <div className="md:w-1/3 w-auto">
              <Button
                label="Thanh toán"
                onClick={onClick}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutDelivery;
