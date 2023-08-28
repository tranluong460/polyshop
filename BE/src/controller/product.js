import Product from "../module/products";
import Category from "../module/category";

import { productSchema } from "../validators/product";
import { searchSchema } from "../validators/search";


export const getAll = async (req, res) => {
  try {
    const data = await Product.find().populate("category");
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Danh sách sản phẩm",
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
    const data = await Product.findById(req.params.id)
      .populate("category")
      .populate({
        path: "comments",
        populate: [
          {
            path: "user",
          },
          {
            path: "feed_back",
            populate: {
              path: "user",
            },
          },
        ],
      });

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có thông tin",
      });
    }

    return res.status(200).json({
      message: "Thông tin sản phẩm",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};
export const getProductByName = async (req, res) => {
  try {
    const { error } = searchSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const { name } = req.body;



    const data = await Product.find({
      name: {
        $regex: name,
        $options: 'i', // Case-insensitive search
      },
    }).populate("category");

    return res.status(200).json({
      message: "Kết quả tìm kiếm",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
}
export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const checkCategory = await Category.findById(req.body.category);
    if (!checkCategory) {
      return res.status(400).json({
        message: "Danh mục không tồn tại",
      });
    }

    const data = await Product.create(req.body);

    if (!data) {
      return res.status(404).json({
        message: "Thêm sản phẩm thất bại",
      });
    }

    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
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
    const data = await Product.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({
        message: "Xóa sản phẩm thất bại",
      });
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công ",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const checkCategory = await Category.findById(req.body.category);
    if (!checkCategory) {
      return res.status(400).json({
        message: "Danh mục không tồn tại",
      });
    }

    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }

    return res.status(200).json({
      message: "Cập nhật sản phẩm thành công ",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};
