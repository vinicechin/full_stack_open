import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from './reducers/anecdoteReducer'
import { AnecdoteForm } from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  console.log(anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    console.log('vote', id)
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
      <AnecdoteForm />
    </div>
  )
}

export default App