import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../src/components/Blog/Blog";
import { beforeEach } from "vitest";

let blogData = {};
let userData = {};

beforeEach(() => {
  blogData = {
    title: "Test blog",
    author: "Test author",
    likes: 5,
    url: "test.blog.com",
    user: {
      id: 0,
    }
  };

  userData = {
    id: 0,
  };
});

test("render title but not content", async () => {
  render(<Blog blog={blogData} user={userData} />);

  screen.getByText("Test blog");
  const url = screen.queryByText("test.blog.com");
  expect(url).toBeNull();
  const author = screen.queryByText("Test author");
  expect(author).toBeNull();
  const likes = screen.queryByText("likes: ", { exact: false });
  expect(likes).toBeNull();
});


test("render title but not content", async () => {
  render(<Blog blog={blogData} user={userData} />);

  const user = userEvent.setup();
  const viewBtn = screen.getByText("view");
  await user.click(viewBtn);

  screen.getByText("test.blog.com");
  screen.getByText("Test author");
  screen.getByText("likes: ", { exact: false });
});