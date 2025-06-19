const User = require("../models/user");

function initialBlogs(userId) {
  return [
    {
      title: "Test 1",
      author: "Test User A",
      url: "http://test1.com",
      likes: 5,
      user: userId
    },
    {
      title: "Test 2",
      author: "Test User A",
      url: "http://test2.com",
      likes: 10,
      user: userId
    },
    {
      title: "Test 3",
      author: "Test User B",
      url: "http://test3.com",
      likes: 8,
      user: userId
    },
  ];
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  usersInDb,
};
