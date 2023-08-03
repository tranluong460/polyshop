import jwt from "jsonwebtoken";

import Feedback from "../module/feedBack";
import User from "../module/auth";
import Comment from "../module/comment";

export const getAll = async (req, res) => {
  try {
    const data = await Feedback.find().populate("user");

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "không có danh sách phản hồi bình luận",
      });
    }

    return res.status(200).json({
      message: "Danh sách phản hồi bình luận",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const data = await Feedback.findOne({ user: req.params.id }).populate(
      "user"
    );

    if (!data) {
      return res.status(404).json({
        message: "Không có phản hồi bình luận",
      });
    }

    return res.status(200).json({
      message: "Thông tin phản hồi bình luận",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    const data = await Feedback.create({
      user: user._id,
      ...req.body,
    });

    if (!data) {
      return res.status(404).json({
        message: "Phản hồi bình luận thất bại",
      });
    }

    await Comment.findByIdAndUpdate(
      req.body.commentId,
      { $push: { feed_back: data._id } },
      { new: true }
    );

    return res.status(200).json({
      message: "Phản hồi bình luận thành công",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const feed_back = await Feedback.findById(req.params.id);

    if (feed_back.user._id == decoded.id) {
      const data = await Feedback.findByIdAndDelete(req.params.id);

      if (!data) {
        return res.status(404).json({
          message: "Xóa phản hồi thất bại",
        });
      }

      return res.status(200).json({
        message: "Xóa phản hồi thành công ",
        data: data,
      });
    }

    return res.status(404).json({
      message: "Bạn không có quyền xóa phản hồi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const feed_back = await Feedback.findById(req.params.id);

    if (feed_back.user._id == decoded.id) {
      const feedBack = await Feedback.findById(req.params.id);
      if (!feedBack) {
        return res.status(404).json({
          message: "Không có phản hồi",
        });
      }

      const data = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!data) {
        return res.status(404).json({
          message: "Cập nhật phản hồi thất bại",
        });
      }

      return res.status(200).json({
        message: "Cập nhật phản hồi thành công ",
        data: data,
      });
    }
    return res.status(404).json({
      message: "Bạn không có quyền cập nhật phản hồi",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};
