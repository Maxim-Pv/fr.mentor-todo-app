import Checkbox from "./Checkbox"

const TodoList = ({  
  todos, onDragStart, onDragOver, onDrop, onCheckboxChange, onRemoveClick 
}) => {
  return (
    <ul className='list-container' onDragOver={onDragOver}>
    {todos.map((todo, index) => (
      <li key={todo.id} draggable 
        onDragStart={(e) => onDragStart(e, index)}
        onDrop={(e) => onDrop(e, index)}
      >
        <Checkbox 
          id={`${todo.id}`}
          text={todo.text}
          completed={todo.completed}
          onCheckboxChange={completed => onCheckboxChange(todo.id, completed)}
          onRemoveClick={() => onRemoveClick(todo.id)}
        />
      </li>
    ))}
  </ul>
  )
}

export default TodoList