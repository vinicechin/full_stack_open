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

async function addVote(id) {
  const res = await axios.get(`${baseUrl}/${id}`);

  if (res.data) {
    console.log(res.data.votes)
    await axios.put(`${baseUrl}/${id}`, {
      content: res.data.content,
      votes: res.data.votes + 1,
    });
  }
}

export default {
  getAll,
  createAnecdote,
  addVote,
}