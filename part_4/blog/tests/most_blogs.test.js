const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("most blogs", () => {
  const blogs = [
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Test 1",
      author: "Test User 1",
      url: "https://test_1.com",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f7",
      title: "Test 2",
      author: "Test User 2",
      url: "https://test_2.com",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Test 3",
      author: "Test User 1",
      url: "https://test_3.com",
      likes: 3,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f9",
      title: "Test 4",
      author: "Test User 3",
      url: "https://test_4.com",
      likes: 7,
      __v: 0,
    },
  ];

  test("empty list, user is undefined", () => {
    assert.strictEqual(listHelper.mostBlogs([]), undefined);
  });

  test("1 element list, user is author of itself", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([blogs[0]]), {
      author: blogs[0].author,
      count: 1,
    });
  });

  test("More than 1 element list, user is the one that appears the most", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: blogs[0].author,
      count: 2,
    });
  });
});
