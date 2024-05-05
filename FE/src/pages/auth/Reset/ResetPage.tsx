import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Input } from "../../../components";
import { useResetPasswordAuthMutation } from "../../../api/auth";
import { message } from "antd";

const ResetPage = () => {
  const { randomString } = useParams<string>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [randomCode, setRandomCode] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [resetPasswordAuth, resultReset] = useResetPasswordAuthMutation();

  const resetPassword = () => {
    const data = { password, randomCode, randomString };

    resetPasswordAuth(data)
      .unwrap()
      .then(() => {
        navigate("/auth");
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
              id="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <Input
              id="randomCode"
              type="text"
              label="Code"
              value={randomCode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRandomCode(e.target.value)
              }
            />

            <Button
              label="Quên mật khẩu"
              onClick={resetPassword}
              disabled={resultReset.isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPage;
