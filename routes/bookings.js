import express from "express";
import {
  createBooking,
  getAllBooking,
  getBooking,
} from "../Controllers/bookingController.js";

import isAdmin from "../utils/isAdmin.js";

const router = express.Router();

//creating a booking
router.post("/create", createBooking);

//for getting single booking
router.get("/:id", getBooking);

//for getting all bookings
router.get("/", isAdmin, getAllBooking);

export default router;
