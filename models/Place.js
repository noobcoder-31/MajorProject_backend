import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    Hotels: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Place = mongoose.model("place", placeSchema);
export default Place;
