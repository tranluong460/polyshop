import Cart from "../module/cart";

export const getCartByUser = async (req, res) => {
  try {
    const cartId = req.user.cart;

    const cart = await Cart.findById(cartId).populate("products.product");

    return res.status(200).json({
      message: "Thông tin giỏ hàng",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const addCart = async (req, res) => {
  const productId = req.body.product;
  const quantity = req.body.quantity || 1;

  try {
    const user = req.user;
    const cart = await Cart.findById(user.cart);

    if (!cart) {
      const newCart = new Cart({
        products: [{ product: productId, quantity: quantity }],
      });

      const data = await newCart.save();
      user.cart = data._id;
      await user.save();
    } else {
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity: quantity });
      }

      await cart.save();
    }

    return res.status(200).json({
      message: "Sản phẩm đã được thêm vào giỏ hàng",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  const cartId = req.body.cartId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: "Không tìm thấy giỏ hàng",
      });
    }

    const cartItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm trong giỏ hàng",
      });
    }

    cartItem.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      message: "Cập nhật thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi server: " + error.message,
    });
  }
};
