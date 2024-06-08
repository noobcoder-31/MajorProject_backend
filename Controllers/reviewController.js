import Tour from "../models/Tour.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

export const createReview = async (req, res, next) => {
  const tourId = req.params.id;
  const newReview = new Review({ ...req.body });

  try {
    const user = await User.findOne({ username: req.body.username });
    const newReview = new Review({ photo: user.photo, ...req.body });
    const savedReview = await newReview.save();

    if (!savedReview) {
      throw new Error("Can't post review at the moment");
    }

    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({}).populate("tourId");

    if (!reviews) {
      throw new Error("No Review found");
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched all Reviews",
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      throw new Error("Review cannot be deleted");
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully deleted Review" });
  } catch (error) {
    next(error);
  }
};
