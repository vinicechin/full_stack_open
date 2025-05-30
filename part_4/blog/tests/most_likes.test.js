const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("most likes", () => {
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

  test("empty list, it is undefined", () => {
    assert.strictEqual(listHelper.mostLikes([]), undefined);
  });

  test("1 element list, it is author of itself", () => {
    assert.deepStrictEqual(listHelper.mostLikes([blogs[0]]), {
      author: blogs[0].author,
      likes: 5,
    });
  });

  test("More than 1 element list, it is the one with biggest sum of likes", () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: blogs[0].author,
      likes: 8,
    });
  });
});
