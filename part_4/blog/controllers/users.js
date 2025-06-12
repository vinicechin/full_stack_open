const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password == null || password.length < 3) {
    return response.status(400).json({ error: 'password invalid, it needs to have at least 3 characters' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get("/", async (_, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
