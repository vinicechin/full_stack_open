const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

describe("blog api", () => {
  const initialBlogs = [
    {
      title: "Test 1",
      author: "Test User A",
      url: "http://test1.com",
      likes: 5,
    },
    {
      title: "Test 2",
      author: "Test User A",
      url: "http://test2.com",
      likes: 10,
    },
    {
      title: "Test 3",
      author: "Test User B",
      url: "http://test3.com",
      likes: 8,
    },
  ];

  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);
  });

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

  test("new blog can be added", async () => {
    const newBlog = {
      title: "Added Test",
      author: "Added Test Author",
      url: "http://add.test.com",
      likes: 25,
    };

    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length + 1);

    const addedBlog = response.body.find(blog => blog.title === newBlog.title);
    assert.deepStrictEqual(addedBlog.title, newBlog.title);
    assert.deepStrictEqual(addedBlog.author, newBlog.author);
    assert.deepStrictEqual(addedBlog.url, newBlog.url);
    assert.deepStrictEqual(addedBlog.likes, newBlog.likes);
  });

  test("blog without likes is initialized with zero", async () => {
    const newBlog = {
      title: "Added Test",
      author: "Added Test Author",
      url: "http://add.test.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, initialBlogs.length + 1);

    const addedBlog = response.body.find(blog => blog.title === newBlog.title);
    assert.deepStrictEqual(addedBlog.likes, 0);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
