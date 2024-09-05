"use client";
import { useState } from "react";
import { Todo } from "./types";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleComplete = (index: number) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">
          Todo List
        </h1>

        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="input input-bordered w-full bg-white border-teal-400 text-gray-800"
            placeholder="Add a new task..."
          />
          <button onClick={addTodo} className="btn btn-teal">
            Add
          </button>
        </div>

        <ul className="list-none space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-2 rounded-lg ${
                todo.completed ? "bg-gray-300" : "bg-white shadow-md"
              }`}
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`cursor-pointer ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(index)}
                className="btn btn-error btn-xs"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
