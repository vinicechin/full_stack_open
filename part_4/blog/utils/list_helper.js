function dummy(blogs) {
  return blogs ? 1 : 1;
};

function totalLikes(blogs) {
  return blogs.reduce((s, v) => s + v.likes, 0);
}

module.exports = {
  dummy,
  totalLikes,
};
