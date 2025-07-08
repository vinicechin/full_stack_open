const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/reset");
    await request.post("/api/users", {
      data: {
        name: "root",
        username: "root",
        password: "secret",
      },
    });

    await page.goto("/");
  });

  describe("when navigating for the first time", () => {
    test("the login form is visible", async ({ page }) => {
      const locator = await page.getByText("username");
      await expect(locator).toBeVisible();
      await expect(page.getByText("password")).toBeVisible();
    });

    test("the login works with right credentials", async ({ page }) => {
      await loginWith(page, "root", "secret");
      await expect(page.getByText("root is logged in.")).toBeVisible();
    });

    test("the login fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "root", "wrong");
      let errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText(
        "Request failed with status code 401"
      );

      await loginWith(page, "wrong", "secret");
      errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText(
        "Request failed with status code 401"
      );

      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

      await expect(page.getByText("root is logged in.")).not.toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "secret");
      await page.getByText("root is logged in.").waitFor();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, "New Blog", "New Author", "new.url.com");
      await expect(page.getByText("New Blog")).toBeVisible();
    });

    describe("and blogs exist", () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, "New Blog 1", "New Author", "new.url-1.com");
        await createBlog(page, "New Blog 2", "New Author", "new.url-2.com");
      });

      test("a blog can be liked", async ({ page }) => {
        const blogDiv = await page.getByText("New Blog 1").locator("..");
        await blogDiv.getByRole("button", { name: "view" }).click();
        let likes = await page.getByText("likes: 0");
        expect(likes).toContainText("likes: 0");
        await blogDiv.getByRole("button", { name: "add" }).click();
        await page.getByText("likes: 1").waitFor();
      });
    });
  });
});
