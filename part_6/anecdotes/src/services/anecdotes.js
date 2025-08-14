import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

async function getAll() {
  const res = await axios.get(baseUrl);
  return res.data;
}

async function createAnecdote(content) {
  const res = await axios.post(baseUrl, {
    content,
    votes: 0,
  })

  return res.data;
}

export default {
  getAll,
  createAnecdote,
}