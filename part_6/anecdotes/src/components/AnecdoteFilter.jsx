import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

export function AnecdoteFilter() {
  const dispatch = useDispatch()

  function handleChange(event) {
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
