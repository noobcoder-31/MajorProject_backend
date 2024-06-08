import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import blogRoute from "./routes/blog.js";

dotenv.config();
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute); //done + checked
app.use("/api/v1/tours", tourRoute); //done
app.use("/api/v1/users", userRoute); //done + checked
app.use("/api/v1/review", reviewRoute); //done
app.use("/api/v1/booking", bookingRoute); //done
app.use("/api/v1/blog", blogRoute);

//error handling middleware
app.use(globalErrorHandler);

export default app;
