import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import Login from "./components/Login";

import '../index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  function onUserResponse(user) {
    setUser(user);
  }

  return (
    <>
      {user ? (
        <Blogs blogs={blogs}>
          <>User {user.name} is logged in</>
        </Blogs>
      ) : (
        <Login onUserResponse={onUserResponse} />
      )}
    </>
  );
};

export default App;
