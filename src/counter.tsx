/** @jsx createElement */
import { createElement, useState } from "./jsx-runtime";

interface ButtonProps {
  onClick: () => void;
  children?: any;
  className?: string;
}

const Button = ({ onClick, children, className }: ButtonProps) => (
  <button
    onClick={onClick}
    className={className}
    style={{
      backgroundColor: "#4f46e5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "all 0.2s ease-in-out",
      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
      margin: "0 5px",
    }}
  >
    {children}
  </button>
);

interface CounterProps {
  initialCount?: number;
}

const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [getCount, setCount] = useState(initialCount);

  const increment = () => setCount(getCount() + 1);
  const decrement = () => setCount(getCount() - 1);
  const reset = () => setCount(initialCount);

  return (
    <div
      className="counter"
      style={{
        textAlign: "center",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: "#ffffff",
          fontSize: "48px",
          fontWeight: "700",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {getCount()}
      </h2>

      <div
        className="buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={increment}>Plus</Button>
        <Button onClick={decrement}>Minus</Button>
        <Button onClick={reset}>Reset</Button>
      </div>
    </div>
  );
};

export { Counter, Button };