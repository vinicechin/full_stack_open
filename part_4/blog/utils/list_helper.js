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
    .orderBy(["count"], ['desc'])
    .value();

  return mapping.length > 0 ? mapping[0] : undefined;
}

function mostLikes(blogs) {
  const mapping = lodash(blogs)
    .groupBy("author")
    .map((blogs, author) => {
      return {
        author,
        likes: lodash.sumBy(blogs, 'likes'),
      };
    })
    .orderBy(["likes"], ['desc'])
    .value();

  return mapping.length > 0 ? mapping[0] : undefined;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
