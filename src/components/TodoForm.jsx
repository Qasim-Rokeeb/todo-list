import { useState } from "react";

export default function TodoForm({ addTodo }) {
  const [task, setTask] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTodo(task);
    setTask("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        className="flex-1 px-4 py-2 rounded-xl  bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm
                   border border-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Add
      </button>
    </form>
  );
}