import User from "../models/User.js";
const isAdmin = async (req, res, next) => {
  const { id } = req.user.id;

  const userData = await User.findOne({ id });

  if (userData.isadmin) {
    next();
  } else {
    next(new Error("Unauthorized Access, Only admin"));
  }
};

export default isAdmin;
