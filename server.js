import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server started listening on ${port} port`);
});
