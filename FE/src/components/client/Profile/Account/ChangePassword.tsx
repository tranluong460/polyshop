import { Tabs, message } from "antd";
import { useEffect, useState } from "react";

import { BiCheckShield } from "react-icons/bi";

import { Button, Input } from "../../..";

import type { TabsProps } from "antd";
import {
  useChangePasswordAuthMutation,
  useCheckCodeAuthMutation,
  useSendCodeAuthMutation,
} from "../../../../api/auth";
import { useNavigate } from "react-router-dom";

type ChangePasswordProps = {
  emailUser: string | undefined;
};

const ChangePassword = ({ emailUser }: ChangePasswordProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState("1");
  const [code, setCode] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidden, setHidden] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [sendCodeAuth] = useSendCodeAuthMutation();
  const [checkCodeAuth] = useCheckCodeAuthMutation();
  const [changePasswordAuth] = useChangePasswordAuthMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const sendCode = () => {
    const data = {
      email: emailUser,
    };

    sendCodeAuth(data)
      .unwrap()
      .then((response) => {
        localStorage.setItem("tokenChange", response.code);
        setHidden(!hidden);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkCode = () => {
    if (code === "") {
      messageApi.error("Mã bảo mật không được để trống");
      return;
    }

    const data = {
      code,
    };

    checkCodeAuth(data)
      .unwrap()
      .then((response) => {
        setStep("2");
        setDisabled(true);
      })
      .catch((error) => {
        messageApi.error(error.data.message);
      });
  };

  const changePassword = () => {
    const data = { oldPassword, password, confirmPassword };

    changePasswordAuth(data)
      .unwrap()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenChange");
        navigate("/auth");
      })
      .catch((error) => {
        messageApi.error(error.data.message);
      });
  };

  const hiddenEmail = (email: string) => {
    if (!email) {
      return "";
    }

    const hiddenEmail = email.replace(/.{3}(?=@)/, "***");

    return hiddenEmail;
  };

  useEffect(() => {
    setStep("1");
    setHidden(false);
    setDisabled(false);
  }, [emailUser]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Xác minh danh tính`,
      disabled: disabled,
      children: (
        <>
          <div className="flex flex-col items-center gap-5">
            <BiCheckShield size={200} className="text-red-500 mt-5" />

            <h2 className="text-base text-gray-500">
              Để tăng cường bảo mật, hãy xác minh đây là tài khoản của bạn.
            </h2>

            {emailUser && (
              <>
                <div
                  className={`flex md:flex-row flex-col gap-5 border-t p-5 items-center ${
                    hidden ? "hidden" : "block"
                  }`}
                >
                  <span className="flex text-lg font-semibold">
                    <span className="mr-1">Email: </span>

                    {hiddenEmail(emailUser)}
                  </span>

                  <Button small label="Gửi mã" onClick={sendCode} />
                </div>

                <div
                  className={`flex gap-5 border-t p-5 ${
                    hidden ? "block" : "hidden"
                  }`}
                >
                  <div className="w-full">
                    <Input
                      id="code"
                      value={code}
                      label="Mã xác minh"
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  <Button label="Xác nhận" onClick={checkCode} />
                </div>
              </>
            )}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: `Đổi mật khẩu`,
      disabled: !disabled,
      children: (
        <>
          <div className="flex flex-col gap-3">
            <Input
              id="oldPassword"
              type="password"
              value={oldPassword}
              label="Mật khẩu cũ"
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <Input
              id="password"
              type="password"
              value={password}
              label="Mật khẩu mới"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              label="Mật khẩu mới"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button label="Đổi mật khẩu" onClick={changePassword} />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <div className="bg-white p-3 py-10 rounded-xl">
        {emailUser ? (
          <Tabs
            activeKey={step}
            tabPosition="top"
            items={items}
            size="large"
            type="line"
            centered
          />
        ) : (
          <div className="text-center">Bạn chưa đăng nhập</div>
        )}
      </div>
    </>
  );
};

export default ChangePassword;
