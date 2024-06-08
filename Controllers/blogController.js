import Blog from "../models/Blog.js";
import User from "../models/User.js";
export const getSingleBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Invalid blog");
    }
    const data = await Blog.findOneByID(id);
    if (!data) {
      throw new Error("Blog does not exist");
    }
    req.send({
      success: true,
      message: "Blog retrieved successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export const getBlogByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const blog = await Blog.find({ author: username });
    if (!blog) {
      throw new Error("Couldn't find blog");
    }
    res.send({
      success: true,
      message: "Blog retrieved successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const data = await Blog.find({});
    if (!data) {
      throw new Error("Can't find Blogs");
    }
    res.send({
      success: true,
      message: "Blog retrieved Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;
    const user = await User.findOne({ username: author });
    const data = await Blog.create({
      title,
      content,
      author,
      photo: user.photo,
    });

    console.log(user);
    if (user) {
      user.blog.push(data._id);
      await user.save();
    }

    if (!data) {
      throw new Error("Could not create blog");
    }
    res.send({
      success: true,
      message: "blog created Successfully",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      throw new Error(`Blog not found`);
    }
    //console.log(blog);
    const user = await User.findById(blog.author);

    if (!user) {
      throw new Error("User not found");
    }

    const index = user.blog.indexOf(id);
    if (index !== -1) {
      user.blog.splice(index, 1);
    }

    await user.save();
    await Blog.deleteOne({ _id: id });
    if (!blog) {
      throw new Error("Can't find BLog to be deleted");
    }
    res.send({
      success: true,
      message: "Blog deleted Successfully",
      data: blog,
    });
  } catch (error) {
    next(error);
  }
};
