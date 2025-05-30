const lodash = require("lodash");

function dummy(blogs) {
  return blogs ? 1 : 1;
}

function totalLikes(blogs) {
  return blogs.reduce((s, v) => s + v.likes, 0);
}

function favoriteBlog(blogs) {
  let favorite = undefined;

  for (const blog of blogs) {
    if (favorite == null || blog.likes > favorite.likes) {
      favorite = blog;
    }
  }

  return favorite;
}

function mostBlogs(blogs) {
  const mapping = lodash(blogs)
    .countBy("author")
    .map((count, author) => {
      return {
        author,
        count,
      };
    })
    .sortBy(["count"])
    .value();

  return mapping.length > 0 ? mapping[mapping.length - 1] : undefined;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
