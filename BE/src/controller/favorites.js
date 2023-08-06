import UserModel from "../module/auth";

export const favorite = async (req, res) => {
  const { productId } = req.body;

  try {
    const isFavorite = req.user.favorites.some(
      (favorite) => favorite.toString() === productId
    );

    if (isFavorite) {
      await UserModel.updateMany(
        { _id: req.user._id },
        { $pull: { favorites: productId } }
      );

      return res.status(200).json({
        message: "Hủy yêu thích thành công",
      });
    }

    await UserModel.updateMany(
      { _id: req.user._id },
      { $addToSet: { favorites: productId } }
    );

    return res.status(200).json({
      message: "Yêu thích thành công",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Lỗi server: " + error.message,
    });
  }
};
