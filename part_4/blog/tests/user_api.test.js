const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

describe("user api", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  describe("when there is initially one user in db", () => {
    test("creation succeeds with a fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "vinicius",
        name: "Vinicius Cechin",
        password: "test123",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      assert(usernames.includes(newUser.username));
    });

    test("creation fails with same username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "root",
        name: "Same Username",
        password: "test123",
      };

      await api.post("/api/users").send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });

  describe("invalid form fields", () => {
    test("creation fails with invalid username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "vi",
        name: "Vinicius Cechin",
        password: "test123",
      };

      await api.post("/api/users").send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails with invalid password", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "vinicius",
        name: "Vinicius Cechin",
        password: "te",
      };

      await api.post("/api/users").send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });

    test("creation fails with missing password", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "vinicius",
        name: "Vinicius Cechin",
      };

      await api.post("/api/users").send(newUser).expect(400);

      const usersAtEnd = await helper.usersInDb();
      assert.strictEqual(usersAtEnd.length, usersAtStart.length);
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
