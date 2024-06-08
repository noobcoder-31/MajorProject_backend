import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getFeaturedTour,
  getTour,
  getTourBySearch,
  getTourCount,
  updateTour,
} from "../Controllers/tourControllers.js";

import isAdmin from "../utils/isAdmin.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

//Create new tour
router.post("/create", isAdmin, createTour);

//Update tour
router.put("/:id", isAdmin, updateTour);

//Delete tour
router.delete("/:id", isAdmin, deleteTour);

//Get single tour
router.get("/:id", getTour);

//Get all tour
router.get("/", getAllTour);

//Get tour by search
router.get("/search/getTourBySearch", getTourBySearch);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCount);

export default router;
