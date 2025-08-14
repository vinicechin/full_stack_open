import { createSlice, createSelector } from '@reduxjs/toolkit'
import AnecdotesService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const anecdote = state.find(obj => obj.id === action.payload)
      anecdote.votes += 1
    },
    setAnecdotes(_, action) {
      return action.payload;
    }
  }
})

function initAnecdotes() {
  return async function (dispatch) {
    const anecdotes = await AnecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }
}

function createAnecdote(content) {
  return async function (dispatch) {
    const newAnecdote = await AnecdotesService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

// Async
export {
  initAnecdotes,
  createAnecdote,
}

// Getters
export const filteredAnecdotes = createSelector(
  state => state,
  state => state.anecdotes.filter(a => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase())
    }).sort((a, b) => b.votes - a.votes)
);

// Setters
export const { appendAnecdote, voteFor, setAnecdotes } = anecdotesSlice.actions

// Reducer
export default anecdotesSlice.reducer