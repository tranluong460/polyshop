import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { v4 as uuidv4 } from "uuid";

import Auth from "../module/auth";

import { loginSchema } from "../validators/login";
import { registerSchema } from "../validators/register";

import { sendVerifyEmail } from "../middleware/sendMail";

import { generateRandomCode } from "../component/function";

config();

export const getAll = async (req, res) => {
  try {
    const users = await Auth.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Không có danh sách người dùng",
      });
    }

    return res.status(200).json({
      message: "Danh sách người dùng",
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Lỗi server " + error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const users = await Auth.findById(req.params.id);

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Không có thông tin người dùng",
      });
    }

    return res.status(200).json({
      message: "Thông tin người dùng",
      data: users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Lỗi server " + error.message,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const email = await Auth.findOne({ email: req.body.email });
    if (email) {
      return res.status(404).json({
        message: "Email đã tồn tại",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    };

    const data = await Auth.create(user);
    data.password = undefined;

    if (!data) {
      return res.status(404).json({ message: "Đăng ký thất bại" });
    }

    let randomCode = generateRandomCode();
    let randomString = uuidv4();

    const token = jwt.sign(
      {
        email: req.body.email,
        randomCode: randomCode,
        randomString: randomString,
      },
      process.env.SECRET_KEY
    );

    const verifyUrl = `${process.env.APP_URL}/auth/verify-email/${token}`;

    sendVerifyEmail(req.body.email, req.body.name, randomCode, verifyUrl);

    return res.status(200).json({
      message: "Đăng ký tài khoản thành công",
      data: data,
      token: token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const verify = async (req, res) => {
  const { randomCode, randomString } = req.body;

  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const email = decoded.email;

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "Không tìm thấy người dùng",
      });
    }

    if (user.isVerifyEmail) {
      return res.status(400).json({
        message: "Email đã được kích hoạt",
      });
    }

    if (
      randomCode !== decoded.randomCode ||
      randomString !== decoded.randomString
    ) {
      return res.status(500).json({
        message: "Mã xác minh không chính xác",
      });
    }

    user.isVerifyEmail = true;
    await user.save();

    return res.status(200).json({
      message: "Xác minh email thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }

    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }

    const passwordHash = await bcrypt.compare(password, user.password);

    if (!passwordHash) {
      return res.status(404).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user.password = undefined;

    return res.status(200).json({
      message: "Đăng nhập tài khoản thành công",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Auth.findById(decoded.id).populate("cards");

    if (!user) {
      return res.status(401).json({
        message: "Người dùng không tồn tại",
      });
    }

    return res.status(200).json({
      message: "Thông tin người dùng",
      data: user,
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token đã hết hạn!",
      });
    } else if (error instanceof jwt.NotBeforeError) {
      return res.status(401).json({
        message: "Token chưa có hiệu lực!",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Token không hợp lệ!",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Đã có lỗi xảy ra!",
    });
  }
};
