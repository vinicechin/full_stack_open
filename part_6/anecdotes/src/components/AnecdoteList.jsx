import { useSelector, useDispatch } from 'react-redux'
import { voteFor, filteredAnecdotes } from '../reducers/anecdoteReducer'

export function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(filteredAnecdotes)

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
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
    </>
  )
}