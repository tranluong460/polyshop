import { useEffect, useState } from "react";
import { message, notification } from "antd";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { IFavoriteUser } from "../../../interface";

type HeartButtonProps = {
  productId: string | undefined;
  favoriteUser: IFavoriteUser[] | undefined;
};

const HeartButton = ({ productId, favoriteUser }: HeartButtonProps) => {
  const [hasFavorite, setHasFavorite] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const toggleFavorite = () => {
    if (!favoriteUser) {
      api.warning({
        message: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để thực hiện hành động này!",
        placement: "topRight",
      });

      return;
    }

    if (hasFavorite) {
      message.warning("Hủy yêu thích thành công!");

      setHasFavorite(false);
    } else {
      message.success("Yêu thích thành công!");

      setHasFavorite(true);
    }
  };

  useEffect(() => {
    let isFavorite = false;

    if (favoriteUser) {
      isFavorite = favoriteUser.some((item) => item === productId);
    }

    setHasFavorite(isFavorite || false);
  }, [productId, favoriteUser]);

  return (
    <>
      {contextHolder}
      <div
        onClick={toggleFavorite}
        className="relative hover:opacity-50 transition cursor-pointer"
      >
        <AiOutlineHeart
          size={28}
          className="fill-white absolute -top-[2px] -right-[2px]"
        />

        <AiFillHeart
          size={24}
          className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
        />
      </div>
    </>
  );
};

export default HeartButton;
