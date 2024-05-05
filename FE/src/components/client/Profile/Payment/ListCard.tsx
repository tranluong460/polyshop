import Card from "./Card";

import { useGetCardsByUserQuery } from "../../../../api/auth";
import { Button, Loading } from "../../..";

const ListCard = () => {
  const { data: listCards, isLoading } = useGetCardsByUserQuery();
  const cardUser = listCards?.listCards;

  return (
    <>
      <div className="bg-white p-5 rounded-xl">
        {isLoading ? (
          <>
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          </>
        ) : (
          <>
            {cardUser ? (
              cardUser.length > 0 ? (
                <div>
                  <div className="flex gap-5 text-center">
                    <h4 className="text-xl font-semibold w-full">
                      Danh sách thẻ ngân hàng
                    </h4>

                    <div className="w-1/8">
                      <Button label="Thêm" small />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {cardUser.map((card) => (
                      <Card key={card?._id} card={card} />
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-center p-5">
                    <h4 className="text-xl font-semibold">
                      Thêm thẻ ngân hàng
                    </h4>
                  </div>

                  <div className="w-full flex justify-center">
                    <div className="w-full md:w-1/2">
                      <Card add />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="text-center">Bạn chưa đăng nhập</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ListCard;
