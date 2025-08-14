import { createSlice, createSelector } from '@reduxjs/toolkit'

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

export const filteredAnecdotes = createSelector(
  state => state,
  state => state.anecdotes.filter(a => {
      return a.content.toLowerCase().includes(state.filter.toLowerCase())
    }).sort((a, b) => b.votes - a.votes)
);

export const { appendAnecdote, voteFor, setAnecdotes } = anecdotesSlice.actions
export default anecdotesSlice.reducer