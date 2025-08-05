import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export function AnecdoteForm() {
  const dispatch = useDispatch()

  const handleAnecdoteCreation = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))
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