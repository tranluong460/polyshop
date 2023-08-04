import { ChangeEvent, useState } from "react";

import { Button, Input } from "../../../components";
import { useForgotPasswordAuthMutation } from "../../../api/auth";
import { message } from "antd";

const ForgotPage = () => {
  const [email, setEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [forgotPasswordAuth] = useForgotPasswordAuthMutation();

  const forgotPassword = () => {
    const body = {
      email,
    };

    forgotPasswordAuth(body)
      .unwrap()
      .then((response) => {
        localStorage.setItem("forgotToken", response.accessCode);
        messageApi.success(response.message + ", vui lòng kiểm tra email");
      })
      .catch((error) => {
        messageApi.error(error.data.message);
      });
  };

  return (
    <>
      {contextHolder}

      <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            Quên mật khẩu
          </h2>

          <div className="flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <Button label="Quên mật khẩu" onClick={forgotPassword} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPage;
