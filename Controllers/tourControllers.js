import Tour from "../models/Tour.js";

export const createTour = async (req, res, next) => {
  const newTour = new Tour(req.body);

  try {
    const savedTour = await newTour.save();
    if (!savedTour) {
      throw new Error("Tour Creation Failed!! Try again later");
    }
    res.status(200).json({
      success: true,
      message: "Tour Created Successfully",
      data: savedTour,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTour = async (req, res, next) => {
  const id = req.params.id;

  try {
    if (req.body.tourId) {
      throw new Error("Cannot Update tour Id");
    }
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedTour) {
      throw new Error("Failed to Update Tour!! Try again later");
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTour = async (req, res, next) => {
  const id = req.params.id;

  try {
    const tour = await Tour.findByIdAndDelete(id);

    if (!tour) {
      throw new Error("Failed to delete tour!! Try again later");
    }

    res
      .status(200)
      .json({ success: true, message: "Tour Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTour = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);

  try {
    const tour = await Tour.findById(id).populate("reviews");

    if (!tour) {
      throw new Error("No tour found");
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched tour",
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTour = async (req, res, next) => {
  try {
    const tours = await Tour.find({}).populate("reviews");

    if (!tours) {
      throw new Error("No tour found");
    }

    res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successfully fetched Tours",
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

export const getTourBySearch = async (req, res, next) => {
  try {
    const { category } = req.body;

    const tours = await Tour.find({ category: category }).populate("reviews");
    if (!tours) {
      throw new Error("No tour found for " + location);
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched tours",
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedTour = async (req, res, next) => {
  try {
    const tours = await Tour.find({ featured: true }).populate("reviews");
    if (!tours) {
      throw new Error("No tour found");
    }

    res.status(200).json({
      success: true,
      message: "Successfully fetched featured tours",
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

export const getTourCount = async (req, res, next) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();

    if (!tourCount) {
      throw new Error("No tour found");
    }

    res.status(200).json({
      success: true,
      message: `Tour count fetched successfully : ${tourCount}`,
      data: tourCount,
    });
  } catch (error) {
    next(error);
  }
};
