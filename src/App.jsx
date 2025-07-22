import { useState, useEffect } from "react";
import { FiCheck, FiEdit2, FiTrash2, FiSun, FiMoon } from "react-icons/fi";

export default function App() {
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem("todos") || "[]")
  );
  const [filter, setFilter] = useState("all"); // 'all' | 'active' | 'completed'
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  /* --- theme & persist --- */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => localStorage.setItem("todos", JSON.stringify(todos)), [todos]);

  /* --- crud --- */
  const addTodo = (text) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, done: false }]);
    setNewTask("");
  };

  const toggleDone = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setTodos(todos.map((t) => (t.id === editingId ? { ...t, text: editText } : t)));
    setEditingId(null);
  };

  /* --- filter --- */
  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center p-4
                  bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100
                  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
                  font-inter transition-colors`}
    >
      {/* dark toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/30 dark:bg-gray-700/30 backdrop-blur-md"
      >
        {dark ? <FiSun className="text-yellow-400" /> : <FiMoon />}
      </button>

      <div className="w-full max-w-md space-y-6 p-6 rounded-3xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl shadow-2xl">
        <h1 className="font-poppins text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          📝 Todo List
        </h1>

        {/* add todo */}
        <form onSubmit={(e) => { e.preventDefault(); addTodo(newTask); }} className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 rounded-xl text-white bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm
                       border border-transparent focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Add
          </button>
        </form>

        {/* filter chips */}
        <div className="flex gap-2 justify-center">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm capitalize transition
                ${filter === f ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* list */}
        <ul className="space-y-3">
          {filtered.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-md"
            >
              <button onClick={() => toggleDone(todo.id)} className="shrink-0">
                {todo.done ? (
                  <FiCheck className="w-5 h-5 text-emerald-500" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                )}
              </button>

              {/* text / edit */}
              {editingId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                  className="flex-1 px-2 py-1 bg-transparent border-b border-indigo-500 outline-none"
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-1 ${todo.done ? "line-through text-gray-500" : ""}`}
                >
                  {todo.text}
                </span>
              )}

              <div className="flex gap-2">
                <button onClick={() => startEdit(todo.id, todo.text)} title="Edit">
                  <FiEdit2 className="w-4 h-4 text-gray-500 hover:text-indigo-500" />
                </button>
                <button onClick={() => removeTodo(todo.id)} title="Delete">
                  <FiTrash2 className="w-4 h-4 text-gray-500 hover:text-rose-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Nothing to see here 🎉
          </p>
        )}
      </div>
    </main>
  );
}