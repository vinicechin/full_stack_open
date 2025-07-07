import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../src/components/Blog/Blog";
import { beforeEach } from "vitest";
import { vi } from "vitest";
import blogService from "../src/services/blogs";
import BlogForm from "../src/components/BlogForm";

vi.mock("../src/services/blogs", () => ({
  default: {
    update: vi.fn(),
    create: vi.fn(({ title, author, url }, _) => {
      return {
        title,
        author,
        url,
        likes: 0,
      };
    }),
  },
}));

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
    },
  };

  userData = {
    id: 0,
  };
});

test("render title but not content", () => {
  render(<Blog blog={blogData} user={userData} />);

  screen.getByText("Test blog");
  const url = screen.queryByText("test.blog.com");
  expect(url).toBeNull();
  const author = screen.queryByText("Test author");
  expect(author).toBeNull();
  const likes = screen.queryByText("likes: ", { exact: false });
  expect(likes).toBeNull();
});

test("render url, author and likes", async () => {
  render(<Blog blog={blogData} user={userData} />);

  const user = userEvent.setup();
  const viewBtn = screen.getByText("view");
  await user.click(viewBtn);

  screen.getByText("test.blog.com");
  screen.getByText("Test author");
  screen.getByText("likes: ", { exact: false });
});

test("clicking add like only calls handler once", async () => {
  const onUpdated = vi.fn();
  blogService.update.mockResolvedValue({});

  render(<Blog blog={blogData} user={userData} onUpdated={onUpdated} />);

  const user = userEvent.setup();
  const viewBtn = screen.getByText("view");
  await user.click(viewBtn);

  const addBtn = screen.getByText("add");
  await user.click(addBtn);
  await user.click(addBtn);

  expect(onUpdated.mock.calls).toHaveLength(2);
});

test("create blog with right config", async () => {
  const onCreated = vi.fn();
  const user = userEvent.setup();

  const el = render(<BlogForm onCreated={onCreated} />);

  const titleInput = screen.getByPlaceholderText("Write title here");
  const authorInput = screen.getByPlaceholderText("Write author here");
  const urlInput = screen.getByPlaceholderText("Write url here");
  const createBtn = screen.getByText("Create");

  await user.type(titleInput, "Auto Test Title");
  await user.type(authorInput, "Auto Test Author");
  await user.type(urlInput, "auto-test-url.com");
  await user.click(createBtn);

  expect(onCreated.mock.calls).toHaveLength(1);
  expect(authorInput).toHaveAttribute("value", "");
  expect(titleInput).toHaveAttribute("value", "");
  expect(urlInput).toHaveAttribute("value", "");
});
