import '../styles/style.css'

const StatusBar = ({ todosRemaining, handleFilterChange, clearCompleted }) => {

  return (
    <div className='status-bar'>
      <span>
        {todosRemaining} {todosRemaining < 2 ? 'item' : 'items' } left
      </span>
      <div className='status-bar__nav'>
        <button className='status-bar__btn'
          onClick={() => handleFilterChange('all')} >All</button>
        <button className='status-bar__btn'
          onClick={() => handleFilterChange('active')} >Active</button>
        <button className='status-bar__btn'
          onClick={() => handleFilterChange('completed')} >Completed</button>
      </div>
      <button className='status-bar__btn-clear'
        onClick={clearCompleted}
      >
        Clear Completed
      </button>
    </div>
  )
}

export default StatusBar