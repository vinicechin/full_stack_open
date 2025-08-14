import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import AnecdotesService from '../services/anecdotes'

export function AnecdoteForm() {
  const dispatch = useDispatch()

  async function handleAnecdoteCreation(event) {
    event.preventDefault()

    const newAnecdote = await AnecdotesService.createAnecdote(event.target.content.value)
    dispatch(appendAnecdote(newAnecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteCreation}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}