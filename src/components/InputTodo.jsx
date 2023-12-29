
const InputTodo = ({ value, onChange, onKeyDown }) => {
  return (
    <div className='input-container'>
        <input 
          className='input'
          type='text' 
          value={value}
          placeholder='Create a new todo...'
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
  )
}

export default InputTodo