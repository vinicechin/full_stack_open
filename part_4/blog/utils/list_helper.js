function dummy(blogs) {
  return blogs ? 1 : 1;
};

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
