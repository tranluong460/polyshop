import Order from "../module/order";
import User from "../module/auth";
import Voucher from "../module/voucher";
import { orderSchema } from "../validators/order";

const getAll = async (req, res) => {
  try {
    const data = await Order.find();

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Không có dữ liệu",
      });
    }

    return res.status(200).json({
      message: "Thông tin các đơn hàng",
      data,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const getOne = async (req, res) => {
  try {
    const data = await Order.findById(req.params.id).populate("vouchers");

    if (!data || !data.length === 0) {
      return res.status(404).json({
        message: "Không có thông tin",
      });
    }

    return res.status(200).json({
      message: "Thông tin đơn hàng",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra " + err.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    let status = "Đang xử lý";
    if (req.body.paymentMethod === "Thanh toán bằng thẻ") {
      status = "Chờ thanh toán";
    }

    const order = await Order.create({ ...req.body, status });

    if (!order) {
      return res.status(404).json({
        message: "Tạo đơn hàng thất bại",
      });
    }

    const voucherIds = req.body.vouchers;
    for (const voucherId of voucherIds) {
      const voucher = await Voucher.findById(voucherId);

      if (voucher) {
        voucher.limit -= 1;
        await voucher.save();
      }
    }

    await User.findOneAndUpdate(
      { _id: req.body.user },
      { $push: { order: order._id, vouchers: voucherIds } },
      { new: true }
    );

    return res.status(201).json({
      message: "Tạo đơn hàng thành công",
      orderId: order._id,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra " + err.message,
    });
  }
};

const edit = async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    order.status = req.body.status;
    await order.save();

    return res.status(200).json({
      message: "Cập nhật đơn hàng thành công",
      order,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const del = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng",
      });
    }

    await order.remove();

    return res.status(200).json({
      message: "Xóa đơn hàng thành công",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

const findOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        message: "Người dùng không có đơn hàng",
      });
    }

    res.status(200).json({ orders });
  } catch (err) {
    console.error("Lỗi truy vấn:", err);

    res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình tìm đơn hàng.",
    });
  }
};

export { getAll, getOne, edit, create, del, findOrdersByUserId };
