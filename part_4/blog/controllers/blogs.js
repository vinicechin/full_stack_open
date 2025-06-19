const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", userExtractor, async (_, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;
  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  if (body.title == null) {
    return response.status(400).end();
  }

  if (body.url == null) {
    return response.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ?? 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(400).json({ error: "blog not found" });
  }

  if (blog.user.toString() !== request.user.id) {
    return response.status(400).json({ error: "user is not owner of blog" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).end();
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  response.json(updatedBlog);
});

module.exports = blogsRouter;
