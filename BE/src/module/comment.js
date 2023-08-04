import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    stars: {
      type: Number,
      default: 0,
    },
    prefer: {
      type: Number,
      default: 0,
    },
    feed_back: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

commentSchema.virtual("name", {
  ref: "User",
  localField: "user",
  foreignField: "_id",
  justOne: true,
  select: "name",
});

export default mongoose.model("Comment", commentSchema);
