import { useEffect, useState } from 'react'
import StatusBar from './components/StatusBar';
import InputTodo from './components/InputTodo';
import TodoList from './components/TodoList';
import './styles/style.css'

function App() {
  const [todoState, setTodoState] = useState({
    todo: '',
    todos: [
      { id: 1, text: 'Complete online JavaScript course', completed: false },
      { id: 2, text: 'Jog around the park 3x', completed: false },
      { id: 3, text: '10 minut meditation', completed: false },
      { id: 4, text: 'Read for 1 hour', completed: false },
      { id: 5, text: 'Pick up groceries', completed: false },
      { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false },
    ],
  });

  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'lightTheme';
  });

  const todosRemaining = todoState.todos.filter(todo => !todo.completed).length

  useEffect(() => {
    const rootElement = document.querySelector('.root');
    if (rootElement) {
      rootElement.classList.toggle('lightTheme', isLightTheme);
      rootElement.classList.toggle('darkTheme', !isLightTheme);
    }

    localStorage.setItem('theme', isLightTheme ? 'lightTheme' : 'darkTheme');
  }, [isLightTheme]);

  const handleCheckboxChange = (id, completed) => {
    setTodoState(prevState => ({
      ...prevState,
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      ),
    }));
  };

  const [filter, setFilter] = useState('all');

  const filteredTodos = () => {
    switch (filter) {
      case 'active':
        return todoState.todos.filter(todo => !todo.completed);
      case 'completed':
        return todoState.todos.filter(todo => todo.completed);
      default:
        return todoState.todos;
    }
  };

  const handleFilterChange = newFilter => {
    setFilter(newFilter);
  };

  const clearCompleted = () => {
    setTodoState(prevState => ({
      ...prevState, 
      todos: [
        ...prevState.todos.filter(todo => !todo.completed)
      ]
    }))
  }

  const handleSwitch = () => {
    setIsLightTheme(prevTheme => !prevTheme);
  }

  const addNewTodo = () => {
    if (todoState.todo.trim() !== '') {
      setTodoState(prevTodoState => ({
        ...prevTodoState,
        todos: [
          ...prevTodoState.todos,
          { id: Date.now(), text: prevTodoState.todo, completed: false },
        ],
        todo: '',
      }))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addNewTodo();
    }
  }

  const handleRemoveTodo = (id) => {
    setTodoState(prevTodoState => ({
      ...prevTodoState,
      todos: prevTodoState.todos.filter(todo => todo.id !== id)
    }))
  }

  // Drag and drop

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain');
    moveTodoItem(draggedIndex, targetIndex);
  }

  const moveTodoItem = (draggedIndex, targetIndex) => {
    setTodoState((prevState) => {
      const updateTodos = [...prevState.todos];
      const [draggedItem] = updateTodos.splice(draggedIndex, 1);
      updateTodos.splice(targetIndex, 0, draggedItem);
      return { ...prevState, todos: updateTodos };
    }) 
  }

  return (
   <div className='app'>
      <div className='app__head'>
        <h1 className='heading'>TODO</h1>
        <button className='sun-icon' onClick={handleSwitch}></button>
      </div>
      <InputTodo 
        value={todoState.todo}
        onChange={e => setTodoState({ ...todoState, todo: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <section className='todos'>
        <TodoList 
          todos={filteredTodos()}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onCheckboxChange={handleCheckboxChange}
          onRemoveClick={handleRemoveTodo}
        />
        <StatusBar 
          todosRemaining={todosRemaining}
          handleFilterChange={handleFilterChange}
          clearCompleted={clearCompleted}
        />
      </section>
      <p className='hint'>Drag and drop to reorder list</p>
      <div className="attribution">
        Coded by <a href="#">Maxim Pavlov</a>
      </div>
   </div>
  )
}

export default App
