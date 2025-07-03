import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";

import "../index.css";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const blogFormTogglableRef = useRef();

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
    setBlogs(newBlogs.sort((blog1, blog2) => blog1.likes - blog2.likes));
  }

  function onBlogCreated() {
    blogFormTogglableRef.current.toggleContent();
    fetchBlogs();
  }

  function onBlogUpdated() {
    fetchBlogs();
  }

  return (
    <>
      {user ? (
        <Blogs blogs={blogs} onUpdated={onBlogUpdated} user={user}>
          <div>
            <>User {user.name} is logged in.</>
            <button onClick={onLogoutClick}>logout</button>
          </div>
          <div style={{ margin: '15px 0 5px' }}>
            <Togglable label="add blog" ref={blogFormTogglableRef}>
              <div style={{ border: '1px solid grey', borderRadius: 4, padding: 4, maxWidth: '300px' }}>
                <BlogForm token={user.token} onCreated={onBlogCreated} />
              </div>
            </Togglable>
          </div>
        </Blogs>
      ) : (
        <Login onUserResponse={onUserResponse} />
      )}
    </>
  );
};

export default App;
