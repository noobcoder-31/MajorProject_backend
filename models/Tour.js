import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortdescription: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  attractions: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      images: { type: String, required: true },
    },
  ],
  hotels: [
    {
      name: { type: String, required: true },
      cost: { type: Number, required: true },
      images: { type: String, required: true },
    },
  ],
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Tour = mongoose.model("tour", TourSchema);

export default Tour;
