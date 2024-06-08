import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogByUsername,
  getSingleBlog,
} from "../Controllers/blogController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getSingleBlog);
router.get("/users/:username", getBlogByUsername);
router.delete("/:id", deleteBlog);
router.post("/", createBlog);

export default router;
