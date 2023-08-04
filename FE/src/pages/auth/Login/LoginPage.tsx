import { ChangeEvent, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import { Button, Input } from "../../../components";
import { useLoginUserMutation } from "../../../api/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loginUser, resultLogin] = useLoginUserMutation();

  const login = () => {
    const data = {
      email,
      password,
    };

    loginUser(data)
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", response.token);
        navigate("/");
      })
      .catch((error) => {
        if (Array.isArray(error.data.message)) {
          messageApi.error(error.data.message[0]);
        } else {
          messageApi.error(error.data.message);
        }
      });
  };

  return (
    <>
      {contextHolder}

      <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-4xl mb-8 font-semibold">Đăng nhập</h2>

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
            <Input
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <Button
              label="Đăng nhập"
              onClick={login}
              disabled={resultLogin.isLoading}
            />

            <button
              onClick={() => navigate("/auth/forgot")}
              className="text-white hover:text-blue-500"
            >
              <p className="text-right">Quên mật khẩu</p>
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => alert("Google")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>

              <div
                onClick={() => alert("Facebook")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition text-blue-600"
              >
                <FaFacebook size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              Bạn chưa có tài khoản
              <span
                onClick={() => navigate("/auth/register")}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
