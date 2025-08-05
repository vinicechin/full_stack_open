import { useSelector, useDispatch } from 'react-redux'
import { voteFor, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  console.log(anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    console.log('vote', id)
  }

  const handleAnecdoteCreation = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.content.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteCreation}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App