const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (_, response) => {
  const notes = await Blog.find({});
  response.json(notes);
});

blogsRouter.post('/', (request, response, next) => {
  const body = request.body;

  const note = new Blog({
    content: body.content,
    important: body.important || false,
  });

  note.save()
    .then(savedNote => {
      response.json(savedNote);
    })
    .catch(error => next(error));
});

module.exports = blogsRouter;