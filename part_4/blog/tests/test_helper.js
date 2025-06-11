const User = require("../models/user");

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  usersInDb,
};
