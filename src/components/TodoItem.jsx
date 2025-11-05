import React from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo, toggleImportant }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.important ? 'important' : ''}`}>
      <span>{todo.text}</span>
      <div className="todo-actions">
        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
        <button onClick={() => toggleImportant(todo.id)} className="important-btn">⭐</button>
        <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>❌</button>
      </div>
    </li>
  );
}

export default TodoItem;