import { useState } from "react";
import TodoForm from "./components/TodoForm";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), text: task }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6 p-4">
      <h1 className="text-2xl font-bold">📝 Todo List</h1>
      <TodoForm addTodo={addTodo} />

      <ul className="w-full max-w-md mt-4 space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white px-4 py-2 rounded shadow"
          >
            <span>{todo.text}</span>
            <button
              onClick={() => removeTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
