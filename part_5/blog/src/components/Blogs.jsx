import Blog from "./Blog/Blog";

const Blogs = ({ blogs, onUpdated, user, children }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {children}
      </div>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} onUpdated={onUpdated} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
