import joi from "joi";

import { errorMessages } from "./component/function";

export const searchSchema = joi.object({
    name: joi.string().required().messages(errorMessages("Tên sản phẩm")),
});
