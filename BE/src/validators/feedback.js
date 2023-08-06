import joi from "joi";

import { errorMessages } from "./component/function";

export const FeedbackSchema = joi.object({
    comment: joi.string().required().messages(errorMessages("Nội dung phản hồi")),
    commentId: joi.string().required().messages(errorMessages("mã bình luận"))
});
