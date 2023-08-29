import { useState } from "react";

import { Button, Input } from "../..";

import { ICardUser } from "../../../interface";

type CheckoutCardProps = {
  title: string;
  cardMain: ICardUser | undefined;
  onClick: (
    cardHolderName: string,
    cardNumber: number | string,
    startDate: string,
    endDate: string,
    cvv: string | number
  ) => void;
  disabled: boolean;
};

const CheckoutCard = ({
  disabled,
  title,
  cardMain,
  onClick,
}: CheckoutCardProps) => {
  const [name, setName] = useState(cardMain?.card_holder_name || "");
  const [number, setNumber] = useState(cardMain?.card_number || "");
  const [startDate, setStartDate] = useState(cardMain?.start_date || "");
  const [endDate, setEndDate] = useState(cardMain?.end_date || "");
  const [cvv, setCvv] = useState(cardMain?.cvv || "");

  return (
    <>
      <div className="bg-gray-100 rounded-xl p-5 mt-10">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-xl">{title}</h4>

          <div className="flex flex-row">
            <div className="col-span-1">
              <img src="/images/payment/credit-card-1.png" alt="Credit-card" />
            </div>

            <div className="col-span-1">
              <img src="/images/payment/credit-card-2.png" alt="Credit-card" />
            </div>

            <div className="col-span-1">
              <img src="/images/payment/credit-card-3.png" alt="Credit-card" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <Input
            id="card_holder_name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="card_number"
            label="Card Number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />

          <div className="flex flex-col md:flex-row gap-5 justify-between">
            <div className="flex flex-col md:flex-row gap-5">
              <Input
                id="start_date"
                label="Valid"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <Input
                id="end_date"
                label="Expiry"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>

            <Input
              id="cvv"
              label="CVV"
              value={cvv}
              onChange={(e) => {
                setCvv(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-center">
            <div className="md:w-1/3 w-auto">
              <Button
                label="Thanh toán"
                onClick={() => onClick(name, number, startDate, endDate, cvv)}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutCard;
