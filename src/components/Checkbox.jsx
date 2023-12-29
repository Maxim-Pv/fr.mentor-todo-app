import { useEffect, useState } from 'react'

const Checkbox = ({ id, text, completed, onCheckboxChange, onRemoveClick }) => {
    
  const [isChecked, setIsChecked] = useState(completed)

  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  const checkboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className='checkbox' htmlFor={`checkbox ${id}`}>
      <input 
        className='checkbox__default'
        type='checkbox' 
        id={`checkbox ${id}`}
        readOnly
        checked={isChecked}
      />
      <span className='checkbox__custom'
        onClick={() => {
          checkboxChange();
          onCheckboxChange(!isChecked);
        }}
      ></span>
      <input 
        className={
          isChecked 
          ? 'checkbox__input crossOut' 
          : 'checkbox__input'
          } 
        value={text} 
        readOnly 
      />
      <button className='btn__delete' onClick={onRemoveClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
        </svg>
      </button>
    </label>
  )
}

export default Checkbox