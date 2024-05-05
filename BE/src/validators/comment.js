import joi from "joi";

import { errorMessages } from "./component/function";

export const commentSchema = joi.object({
  product: joi.string().required().messages(errorMessages("Id sản phẩm")),
  stars: joi.number().required().messages(errorMessages("Đánh giá")),
  comment: joi.string().required().messages(errorMessages("Bình luận")),
});
