import Booking from "./../models/Booking.js";

export const createBooking = async (req, res, next) => {
  const newBooking = new Booking(req.body);

  try {
    const savedBooking = await newBooking.save();

    if (!savedBooking) {
      throw new Error("Cannot Book at the moment");
    }
    res.status(200).json({
      success: true,
      message: "Your tour is booked!",
      data: savedBooking,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      const err = new Error("No Booking found");
      err.statusCode = 404;
      throw err;
    }
    res
      .status(200)
      .json({ success: true, message: "Successful!", data: booking });
  } catch (error) {
    next(error);
  }
};

export const getAllBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    if (!bookings || bookings.length === 0) {
      const err = new Error("No Booking found");
      err.statusCode = 404;
      throw err;
    }
    res
      .status(200)
      .json({ success: true, message: "Successful!", data: bookings });
  } catch (error) {
    next(error);
  }
};
