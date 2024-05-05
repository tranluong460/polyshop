import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import {
  AuthRouter,
  CategoryRouter,
  ChangePassword,
  CommentRouter,
  ContactRouter,
  FavoriteRouter,
  OrderRouter,
  ProductRouter,
  VoucherRouter,
  FeedbackRouter,
  CardRouter,
  PaymentRouter,
  CartRouter
} from "./router";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/card", CardRouter);
app.use("/category", CategoryRouter);
app.use("/", ChangePassword);
app.use("/comment", CommentRouter);
app.use("/contact", ContactRouter);
app.use("/favorites", FavoriteRouter);
app.use("/feedback", FeedbackRouter);
app.use("/order", OrderRouter);
app.use("/products", ProductRouter);
app.use("/voucher", VoucherRouter);
app.use("/", PaymentRouter);
app.use("/cart", CartRouter)

mongoose.connect(process.env.DB_URL);

export const viteNodeApp = app;
