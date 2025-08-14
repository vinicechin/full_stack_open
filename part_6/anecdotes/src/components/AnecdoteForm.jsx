import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export function AnecdoteForm() {
  const dispatch = useDispatch()

  async function handleAnecdoteCreation(event) {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
    
    dispatch(createAnecdote(content))
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