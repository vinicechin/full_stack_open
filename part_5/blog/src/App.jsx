import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Login from "./components/Login";

import '../index.css';

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
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  function onUserResponse(user) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  function onLogoutClick() {
    localStorage.removeItem("user");
    setUser(undefined);
  }

  return (
    <>
      {user ? (
        <Blogs blogs={blogs}>
          <>User {user.name} is logged in</>
          <button onClick={onLogoutClick} >logout</button>
        </Blogs>
      ) : (
        <Login onUserResponse={onUserResponse} />
      )}
    </>
  );
};

export default App;
