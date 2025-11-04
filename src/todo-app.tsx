/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => (
  <li
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
      padding: "8px 10px",
      borderRadius: "8px",
      background: "#f9fafb",
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}
  >
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo.id)}
      style={{ marginRight: "8px", cursor: "pointer" }}
    />
    <span
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        flex: 1,
        color: todo.completed ? "#9ca3af" : "#111827",
      }}
    >
      {todo.text}
    </span>
    <button
      onClick={() => onDelete(todo.id)}
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "4px 8px",
        cursor: "pointer",
      }}
    >
      ✖
    </button>
  </li>
);

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => (
  <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
    {todos.length === 0 ? (
      <li
        style={{
          textAlign: "center",
          color: "#9ca3af",
          padding: "8px",
          fontStyle: "italic",
        }}
      >
        No todos yet
      </li>
    ) : (
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))
    )}
  </ul>
);

const AddTodoForm = ({ onAdd }: AddTodoFormProps) => {
  let inputRef: HTMLInputElement | null = null;

  const handleAddClick = () => {
    if (!inputRef) return;
    const text = inputRef.value.trim();
    if (text.length === 0) return; 
    onAdd(text);
    inputRef.value = "";
  };

  return (
    <div style={{ display: "flex", marginBottom: "16px" }}>
      <input
        ref={(el: any) => (inputRef = el)}
        type="text"
        placeholder="Enter a new todo..."
        style={{
          flex: 1,
          padding: "8px 10px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          marginRight: "8px",
          fontSize: "14px",
        }}
      />
      <button
        onClick={handleAddClick}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "8px 16px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Add
      </button>
    </div>
  );
};

const TodoApp = () => {
  const [getTodos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    const updated = [...getTodos(), newTodo].filter((t) => t.text.trim() !== "");
    setTodos(updated);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      getTodos().map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(getTodos().filter((todo) => todo.id !== id));
  };

  const todos = getTodos();
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "40px auto",
        fontFamily: "Inter, sans-serif",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        padding: "24px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "16px",
          fontWeight: "700",
          color: "#1f2937",
        }}
      >
        📝 Todo Tracker
      </h2>

      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

      <div
        style={{
          marginTop: "16px",
          textAlign: "center",
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        <p>Total Todos: {total}</p>
        <p>Completed: {completed}</p>
      </div>
    </div>
  );
};

export { TodoApp };
