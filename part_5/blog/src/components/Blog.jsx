import Togglable from "./Togglable";

const Blog = ({ blog }) => {
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

  return (
    <div style={styles.container}>
      <span style={styles.title}>{blog.title}</span>
      <Togglable label="view">
        <div style={styles.content}>
          <div>{blog.url}</div>
          <div>likes: {blog.likes}<button style={styles.likesbtn}>view</button></div>
          <div>{blog.author}</div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
