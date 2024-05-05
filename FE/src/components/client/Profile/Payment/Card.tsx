import { useState } from "react";
import { Checkbox, message } from "antd";

import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { ICardUser } from "../../../../interface";
import {
  useCreateCardMutation,
  useUploadCardMutation,
} from "../../../../api/auth";

type CardProps = {
  card?: ICardUser;
  add?: boolean;
};

const Card = ({ card, add }: CardProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const _id = card?._id || "";
  const [newName, setNewName] = useState(card?.card_holder_name || "");
  const [newNumber, setNewNumber] = useState(card?.card_number || "");
  const [newStartDate, setNewStartDate] = useState(card?.start_date || "");
  const [newEndDate, setNewEndDate] = useState(card?.end_date || "");
  const [newCvv, setNewCvv] = useState(card?.cvv || "");
  const [newMain, setNewMain] = useState(card?.main);

  const [uploadCard, resultCard] = useUploadCardMutation();
  const [createCard] = useCreateCardMutation();

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onChange = (e: CheckboxChangeEvent) => {
    setNewMain(e.target.checked);
  };

  const onAdd = () => {
    const data = {
      card_holder_name: newName,
      card_number: newNumber,
      start_date: newStartDate,
      end_date: newEndDate,
      cvv: newCvv,
      main: newMain,
    };

    createCard(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        setIsEdit(!isEdit);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = () => {
    const data = {
      _id,
      card_holder_name: newName,
      card_number: newNumber,
      start_date: newStartDate,
      end_date: newEndDate,
      cvv: newCvv,
      main: newMain,
    };

    uploadCard(data)
      .unwrap()
      .then((response) => {
        message.success(response.message);
        setIsEdit(!isEdit);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="h-auto p-5 w-full m-auto rounded-xl relative text-white transition-transform transform hover:scale-110">
        {isEdit ? (
          <div className="absolute top-8 right-10">
            <Checkbox onChange={onChange} defaultChecked={newMain} />
          </div>
        ) : null}

        <div
          className={`bg-cover bg-fixed rounded-xl p-10
          ${
            card?.main
              ? "bg-[url(/images/card/card-1.png)]"
              : "bg-[url(/images/card/card-2.png)]"
          }
          `}
        >
          <div className="flex justify-between">
            <div>
              <p className="font-light">Name</p>
              {isEdit ? (
                <input
                  type="text"
                  value={newName}
                  className={`text-white outline-none tracking-widest font-medium
                  bg-gradient-to-r
                  ${
                    card?.main
                      ? "from-[#335af3] to-[#487cf5]"
                      : "from-[#f58749] to-[#f99056]"
                  }
                  `}
                  onChange={(e) => setNewName(e.target.value)}
                />
              ) : (
                <p className="font-medium tracking-widest">
                  {card?.card_holder_name}
                </p>
              )}
            </div>

            <img className="w-14 h-14" src="/images/card/master-card.png" />
          </div>
          <div className="pt-1">
            <p className="font-light">Card Number</p>
            {isEdit ? (
              <input
                type="number"
                value={newNumber}
                className={`text-white outline-none tracking-widest font-medium
                bg-gradient-to-r
                ${
                  card?.main
                    ? "from-[#3054f2] to-[#4476f5]"
                    : "from-[#f68749] to-[#f99158]"
                }
                `}
                onChange={(e) => setNewNumber(e.target.value)}
              />
            ) : (
              <p className="font-medium tracking-widest">{card?.card_number}</p>
            )}
          </div>
          <div className="pt-6 pr-6">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="font-light text-xs">Valid</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={newStartDate}
                    className={`text-white outline-none font-medium w-full tracking-widest
                    bg-gradient-to-r
                    ${
                      card?.main
                        ? "from-[#2f53f2] to-[#3b67f3]"
                        : "from-[#f6884b] to-[#f88d52]"
                    }
                    `}
                    onChange={(e) => setNewStartDate(e.target.value)}
                  />
                ) : (
                  <p className="font-medium tracking-widest">
                    {card?.start_date}
                  </p>
                )}
              </div>

              <div>
                <p className="font-light text-xs">Expiry</p>
                {isEdit ? (
                  <input
                    type="text"
                    value={newEndDate}
                    className={`
                    text-white outline-none w-full tracking-widest font-medium
                    bg-gradient-to-r
                    ${
                      card?.main
                        ? "from-[#3a65f4] to-[#4577f5]"
                        : "from-[#f88d53] to-[#fa935b]"
                    }
                    `}
                    onChange={(e) => setNewEndDate(e.target.value)}
                  />
                ) : (
                  <p className="font-medium tracking-widest">
                    {card?.end_date}
                  </p>
                )}
              </div>

              <div>
                <p className="font-light text-xs">CVV</p>
                {isEdit ? (
                  <input
                    type="number"
                    value={newCvv}
                    className={`
                    text-white outline-none tracking-widest font-medium w-full
                    bg-gradient-to-r
                    ${
                      card?.main
                        ? "from-[#4678f6] to-[#5c92f8]"
                        : "from-[#f9935c] to-[#fba06e]"
                    }
                    `}
                    onChange={(e) => setNewCvv(e.target.value)}
                  />
                ) : (
                  <p className="font-medium tracking-widest">{card?.cvv}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEdit ? (
          <div className="absolute bottom-8 right-10 flex justify-end gap-5">
            {add ? (
              <button
                className="mt-3 hover:text-rose-500 disabled:cursor-not-allowed"
                onClick={onAdd}
                disabled={resultCard.isLoading}
              >
                Thêm
              </button>
            ) : (
              <button
                className="mt-3 hover:text-rose-500 disabled:cursor-not-allowed"
                onClick={onFinish}
                disabled={resultCard.isLoading}
              >
                Lưu
              </button>
            )}

            <button
              className="mt-3 hover:text-rose-500 disabled:cursor-not-allowed"
              onClick={toggleEdit}
              disabled={resultCard.isLoading}
            >
              Hủy
            </button>
          </div>
        ) : (
          <div className="absolute bottom-8 right-10 flex justify-end gap-5">
            <button className="mt-3 hover:text-rose-500" onClick={toggleEdit}>
              {add ? "Thêm" : "Sửa"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
