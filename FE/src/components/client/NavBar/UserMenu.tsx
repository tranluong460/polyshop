import { Badge } from "antd";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineBell } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { IUser } from "../../../interface";

type UserMenuProps = {
  currentUser: IUser | null;
  onClick: () => void;
};

const UserMenu = ({ currentUser, onClick }: UserMenuProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-row items-center gap-3 ">
          <div className="hidden md:block cursor-pointer transition ">
            <Badge count={0} size="small">
              <AiOutlineBell
                size={26}
                className="hover:text-rose-300 text-black"
              />
            </Badge>
          </div>

          <div
            onClick={onClick}
            className="hidden md:block cursor-pointer transition px-4"
          >
            <Badge count={0} size="small">
              <FiShoppingCart
                size={22}
                className="hover:text-rose-300 text-black"
              />
            </Badge>
          </div>

          <div
            onClick={toggleOpen}
            className="md:px-4 hover:shadow md:py-1 border-neutral-200 rounded-full cursor-pointer transition"
          >
            <Avatar src={currentUser?.image?.url} />
          </div>

          {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
              <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                  <>
                    <MenuItem
                      label="Thông tin cá nhân"
                      onClick={() => navigate("/profile")}
                    />
                    <MenuItem
                      label="Đơn hàng của tôi"
                      onClick={() => navigate("/profile/orders")}
                    />
                    <MenuItem
                      label="Sản phẩm yêu thích"
                      onClick={() => navigate("/profile/favorite")}
                    />
                    <hr />
                    <MenuItem label="Đăng xuất" onClick={logOut} />
                  </>
                ) : (
                  <>
                    <MenuItem
                      label="Đăng nhập"
                      onClick={() => navigate("/auth")}
                    />
                    <MenuItem
                      label="Đăng ký"
                      onClick={() => navigate("/auth/register")}
                    />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserMenu;
