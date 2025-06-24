import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, onUpdated }) => {
  const styles = {
    container: {
      border: '1px solid grey',
      borderRadius: 4,
      margin: 4,
      padding: 4,
    },
    title: {
      marginRight: 5,
    },
    content: {
      marginTop: 10,
    },
    likesbtn: {
      marginleft: 5,
    }
  };

  async function onLikeClick() {
    await blogService.update(blog.id, {
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      user: blog.user.id,
    });

    onUpdated && onUpdated();
  }

  return (
    <div style={styles.container}>
      <span style={styles.title}>{blog.title}</span>
      <Togglable label="view">
        <div style={styles.content}>
          <div>{blog.url}</div>
          <div>likes: {blog.likes}<button onClick={onLikeClick} style={styles.likesbtn}>add</button></div>
          <div>{blog.author}</div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
