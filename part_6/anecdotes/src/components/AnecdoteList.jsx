import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor, filteredAnecdotes, setAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import AnecdotesService from '../services/anecdotes'

export function AnecdoteList() {
  const dispatch = useDispatch()
  const anecdotes = useSelector(filteredAnecdotes)

  useEffect(() => {
    fetchAnecdotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchAnecdotes() {
    const anecdotes = await AnecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  }

  function vote(id) {
    dispatch(voteFor(id))

    const content = anecdotes.find(a => a.id === id)?.content;
    handleToast(`You voted for '${content}'`)
  }

  function handleToast(toastMessage) {
    dispatch(setNotification({
      message: toastMessage,
      toastClass: 'success',
    }))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 3000)
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