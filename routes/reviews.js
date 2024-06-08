import express from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../Controllers/reviewController.js";
import isAdmin from "../utils/isAdmin.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

//id here is tour's Id
router.post("/:id", createReview);

//id here id of is review to be deleted
router.delete("/:id", isAdmin, deleteReview);

router.get("/", getAllReviews);

export default router;
