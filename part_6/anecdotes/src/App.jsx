import { AnecdoteList } from './components/AnecdoteList'
import { AnecdoteForm } from './components/AnecdoteForm'
import { AnecdoteFilter } from './components/AnecdoteFilter'
import { Notification } from './components/Notification'

import '../index.css'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification />
    </div>
  )
}

export default App