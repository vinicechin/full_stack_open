import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";

import "../index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser != null) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  function onUserResponse(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function onLogoutClick(e) {
    e.preventDefault();
    localStorage.removeItem("user");
    setUser(undefined);
  }

  async function fetchBlogs() {
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs);
  }

  return (
    <>
      {user ? (
        <Blogs blogs={blogs}>
          <div>
            <>User {user.name} is logged in.</>
            <button onClick={onLogoutClick}>logout</button>
          </div>
          <BlogForm token={user.token} onCreated={fetchBlogs} />
        </Blogs>
      ) : (
        <Login onUserResponse={onUserResponse} />
      )}
    </>
  );
};

export default App;
