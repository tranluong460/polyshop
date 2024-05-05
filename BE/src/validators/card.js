import joi from "joi";

import { errorMessages } from "./component/function";

export const cardSchema = joi.object({
  card_holder_name: joi
    .string()
    .required()
    .messages(errorMessages("Tên chủ thẻ")),
  card_number: joi.string().required().messages(errorMessages("Mã số thẻ")),
  start_date: joi.string().required().messages(errorMessages("Ngày bắt đầu")),
  end_date: joi.string().required().messages(errorMessages("Ngày kết thúc")),
  cvv: joi.number().required().messages(errorMessages("CVV")),
  main: joi.boolean().optional(),
});
