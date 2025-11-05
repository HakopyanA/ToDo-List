import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("date");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      important: false,
      date: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const toggleImportant = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, important: !t.important } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "date") return new Date(b.date) - new Date(a.date);
    if (sort === "status") return a.completed - b.completed;
    return 0;
  });

  const total = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="app-container">
      <h1>ToDo-List</h1>

      <div className="todo-form">
        <input
          type="text"
          className="todo-input"
          placeholder="Введите задачу..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Добавить</button>
      </div>

      <div className="progress-container">
        <span>{completedCount} из {total}</span>
        <span>{progress}%</span>
      </div>

      <ul className="todo-list">
        {sortedTasks.map(task => (
          <li
            key={task.id}
            className={`todo-item ${task.completed ? "completed" : ""} ${task.important ? "important" : ""}`}
            onDoubleClick={() => toggleImportant(task.id)}
          >
            <span>{task.text}</span>
            <div className="todo-actions">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>✖</button>
            </div>
          </li>
        ))}
      </ul>

      <button className="clear-btn" onClick={clearCompleted}>
        Сбросить выполненные
      </button>
    </div>
  );
}