import Review from "../models/Review.js";
import User from "../models/User.js";

export const createReview = async (req, res, next) => {
  const tourId = req.params.id;
  const newReview = new Review({ ...req.body });

  try {
    const user = await User.findOne({ username: req.body.username });
    const newReview = new Review({ photo: user?.photo, ...req.body });
    const savedReview = await newReview.save();

    if (!savedReview) {
      throw new Error("Can't post review at the moment");
    }

    await User.findByIdAndUpdate(user._id, {
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
    const userId = req.params.id;

    const user = await User.findById(userId);
    const reviews = await Review.find({ username: user.username }).populate(
      "tourId"
    );

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

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const { username } = req.body;
    if (username) {
      throw new Error("Username Cannot be updated");
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("Cannot update user at the moment");
    }

    res.status(200).json({
      success: true,
      message: "User Data Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error("User cannot be deleted");
    }

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).populate("blog");

    if (!user) {
      throw new Error(`User not found`);
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: user });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users) {
      throw new Error("No users found");
    }

    res
      .status(200)
      .json({ success: true, message: "Successfully", data: users });
  } catch (error) {
    next(error);
  }
};
