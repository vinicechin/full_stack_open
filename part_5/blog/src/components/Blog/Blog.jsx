import Togglable from "../Togglable";
import blogService from "../../services/blogs";

import "./Blog.css";

const Blog = ({ blog, onUpdated, user }) => {

  async function onLikeClick() {
    await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id,
    }, user.token);

    onUpdated && onUpdated();
  }

  async function onDeleteClick() {
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return;
    }

    await blogService.remove(blog.id, user.token);
    onUpdated && onUpdated();
  }

  return (
    <div className="container">
      <span className="title">{blog.title}</span>
      <Togglable label="view">
        <div className="content">
          <div>{blog.url}</div>
          <div>likes: {blog.likes}<button onClick={onLikeClick} className="likesBtn">add</button></div>
          <div>{blog.author}</div>
        </div>
        {user.id === blog.user.id && <button className="deletebtn" onClick={onDeleteClick}>delete</button>}
      </Togglable>
    </div>
  );
};

export default Blog;
