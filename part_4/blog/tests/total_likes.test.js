const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Test 1',
      author: 'Test User',
      url: 'https://test_1.com',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Test 2',
      author: 'Test User',
      url: 'https://test_2.com',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Test 3',
      author: 'Test User',
      url: 'https://test_3.com',
      likes: 3,
      __v: 0
    },
  ];

  test("empty list, is 0", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0);
  });

  test("1 element list, is the value of itself", () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 5);
  });

  test("More than 1 element list, is the sum of all", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 15);
  });
});
