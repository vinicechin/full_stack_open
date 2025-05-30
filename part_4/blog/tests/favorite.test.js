const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("favorite blog", () => {
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
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test 4',
      author: 'Test User',
      url: 'https://test_4.com',
      likes: 7,
      __v: 0
    },
  ];

  test("empty list, favorite is undefined", () => {
    assert.strictEqual(listHelper.favoriteBlog([]), undefined);
  });

  test("1 element list, favorite is itself", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([blogs[0]]), blogs[0]);
  });

  test("More than 1 element list, favorite is one of the blogs", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[1]);
  });
});
