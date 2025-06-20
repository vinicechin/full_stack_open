import Blog from "./Blog";

const Login = ({ blogs, children }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {children}
      </div>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Login;
