import express from "express";
import {
  createReview,
  deleteUser,
  getAllReviews,
  getAllUser,
  getUser,
  updateUser,
} from "../Controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";
import isAdmin from "../utils/isAdmin.js";

const router = express.Router();

router.put("/update/:id", updateUser);

router.delete("/", deleteUser);
router.post("/review/:id", createReview);
router.get("/review/:id", getAllReviews);

//id here is of user whom data we want
router.get("/:id", getUser);

router.get("/", isAdmin, getAllUser);

export default router;
