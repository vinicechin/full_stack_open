const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const helper = require('./test_helper');
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

let token = "";
let initialBlogs = [];

describe("blog api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", name: "root", passwordHash });
    await user.save();

    const loginInfo = {
      username: user.username,
      password: "secret",
    };

    const loginResponse = await api.post("/api/login").send(loginInfo);
    const userId = loginResponse.body.id;
    token = loginResponse.body.token;

    initialBlogs = helper.initialBlogs(userId);
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

  describe("blogs access and validity", () => {
    test("all blogs are returned", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.length, initialBlogs.length);

      const titles = response.body.map((e) => e.title);
      assert.strictEqual(titles.includes("Test 1"), true);
      assert.strictEqual(titles.includes("Test 2"), true);
      assert.strictEqual(titles.includes("Test 3"), true);
    });

    test("all blogs have an id field", async () => {
      const response = await api.get("/api/blogs");

      const ids = response.body.map((e) => e.id);
      assert.strictEqual(ids.includes(undefined), false);
    });

    test("all blogs have a user field", async () => {
      const response = await api.get("/api/blogs");

      const ids = response.body.map((e) => e.user);
      assert.strictEqual(ids.includes(undefined), false);
    });
  });

  describe("add new blog", () => {
    test("new blog can be added", async () => {
      const users = await helper.usersInDb();

      const newBlog = {
        title: "Added Test",
        author: "Added Test Author",
        url: "http://add.test.com",
        likes: 25,
        userId: users[0].id,
      };

      await api
        .post("/api/blogs")
        .set({ "authorization": "Bearer " + token })
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body.length, initialBlogs.length + 1);

      const addedBlog = response.body.find(blog => blog.title === newBlog.title);
      assert.deepStrictEqual(addedBlog.title, newBlog.title);
      assert.deepStrictEqual(addedBlog.author, newBlog.author);
      assert.deepStrictEqual(addedBlog.url, newBlog.url);
      assert.deepStrictEqual(addedBlog.likes, newBlog.likes);
      assert.deepStrictEqual(addedBlog.user.id, newBlog.userId);
    });

    test("new blog without auth token can't be added", async () => {
      const users = await helper.usersInDb();

      const newBlog = {
        title: "Added Test",
        author: "Added Test Author",
        url: "http://add.test.com",
        likes: 25,
        userId: users[0].id,
      };

      await api.post("/api/blogs").send(newBlog).expect(400);

      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body.length, initialBlogs.length);
    });

    test("blog without likes is initialized with zero", async () => {
      const users = await helper.usersInDb();

      const newBlog = {
        title: "Added Test",
        author: "Added Test Author",
        url: "http://add.test.com",
        userId: users[0].id,
      };

      await api
        .post("/api/blogs")
        .set({ "authorization": "Bearer " + token })
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const response = await api.get("/api/blogs");
      assert.strictEqual(response.body.length, initialBlogs.length + 1);

      const addedBlog = response.body.find(blog => blog.title === newBlog.title);
      assert.deepStrictEqual(addedBlog.likes, 0);
    });

    test("blog without title results in bad request", async () => {
      const users = await helper.usersInDb();

      const newBlog = {
        author: "Added Test Author",
        url: "http://add.test.com",
        likes: 25,
        userId: users[0].id,
      };

      await api.post("/api/blogs").set({ "authorization": "Bearer " + token }).send(newBlog).expect(400);
    });

    test("blog without url results in bad request", async () => {
      const users = await helper.usersInDb();

      const newBlog = {
        title: "Added Test",
        author: "Added Test Author",
        likes: 25,
        userId: users[0].id,
      };

      await api.post("/api/blogs").set({ "authorization": "Bearer " + token }).send(newBlog).expect(400);
    });
  });

  describe("delete blog", () => {
    test("first blog can be deleted", async () => {
      const response = await api.get("/api/blogs");
      const blog = response.body[0];

      await api.delete(`/api/blogs/${blog.id}`).set({ "authorization": "Bearer " + token }).expect(204);
    });

    test("last blog can be deleted", async () => {
      const response = await api.get("/api/blogs");
      const blog = response.body[response.body.length-1];

      await api.delete(`/api/blogs/${blog.id}`).set({ "authorization": "Bearer " + token }).expect(204);
    });

    test("inexistent blog deletion is invalid", async () => {
      await api.delete("/api/blogs/invalidid").set({ "authorization": "Bearer " + token }).expect(400);
    });
  });

  describe("edit blog", () => {
    test("can edit blog title", async () => {
      let response = await api.get("/api/blogs");
      const blog = response.body[0];

      await api.put(`/api/blogs/${blog.id}`).send({
        title: "New Title",
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        userId: blog.user.id,
      }).expect(200);

      response = await api.get("/api/blogs");
      assert.strictEqual(response.body.find((blog) => blog.title === "New Title")?.id, blog.id);
    });

    test("can edit blog url", async () => {
      let response = await api.get("/api/blogs");
      const blog = response.body[0];

      await api.put(`/api/blogs/${blog.id}`).send({
        title: blog.title,
        author: blog.author,
        url: "http://changed-url.com",
        likes: blog.likes,
        userId: blog.user.id,
      }).expect(200);

      response = await api.get("/api/blogs");
      assert.strictEqual(response.body.find((blog) => blog.url === "http://changed-url.com")?.id, blog.id);
    });

    test("can edit blog author", async () => {
      let response = await api.get("/api/blogs");
      const blog = response.body[0];

      await api.put(`/api/blogs/${blog.id}`).send({
        title: blog.title,
        author: "New Author",
        url: blog.url,
        likes: blog.likes,
        userId: blog.user.id,
      }).expect(200);

      response = await api.get("/api/blogs");
      assert.strictEqual(response.body.find((blog) => blog.author === "New Author")?.id, blog.id);
    });

    test("can edit blog likes", async () => {
      let response = await api.get("/api/blogs");
      const blog = response.body[0];

      await api.put(`/api/blogs/${blog.id}`).send({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: 100,
        userId: blog.user.id,
      }).expect(200);

      response = await api.get("/api/blogs");
      assert.strictEqual(response.body.find((blog) => blog.likes === 100)?.id, blog.id);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
