import { useState } from "react";
import blogService from "../services/blogs";
import { Toast } from "./Toast";

const BlogForm = ({ onCreated, token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [toastClass, setToastClass] = useState("success");

  function handleToast(toastType, toastMessage) {
    setToastClass(toastType);
    setToastMessage(toastMessage);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }

  async function onCreateClick(e) {
    e.preventDefault();

    try {
      await blogService.create({ title, author, url }, token);
      onCreated && onCreated();
      setTitle('');
      setAuthor('');
      setUrl('');
      handleToast("success", "New blog added");
    } catch (err) {
      handleToast("error", err.message);
    }
  }

  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function onUrlChange(e) {
    setUrl(e.target.value);
  }

  return (
    <div>
      <h2 style={{ margin: '5px 0' }}>Create a blog</h2>
      <form onSubmit={onCreateClick}>
        <div>
          <span style={{ marginRight: 5 }}>Title</span>
          <input placeholder="Write title here" type="text" onChange={onTitleChange} value={title} />
        </div>
        <div>
          <span style={{ marginRight: 5 }}>Author</span>
          <input placeholder="Write author here" type="text" onChange={onAuthorChange} value={author} />
        </div>
        <div>
          <span style={{ marginRight: 5 }}>Url</span>
          <input placeholder="Write url here" type="text" onChange={onUrlChange} value={url} />
        </div>
        <button type="submit" style={{ marginTop: 5 }}>Create</button>
      </form>
      <Toast message={toastMessage} toastClass={toastClass} />
    </div>
  );
};

export default BlogForm;
