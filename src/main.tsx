/** @jsx createElement */
import { createElement, mount } from "./jsx-runtime";
import { Counter } from "./counter";
import { TodoApp } from "./todo-app";
import { Dashboard } from "./dashboard";
import { Button } from "./components";
import { useState } from "./jsx-runtime";
import "./style.css";
import type { VNode } from "./jsx-runtime";

const Router = () => {
  const [getCurrentPage, setCurrentPage] = useState<string>("home");

  const navigateTo = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (getCurrentPage()) {
      case "counter":
        return <Counter initialCount={0} />;
      case "todo":
        return <TodoApp />;
      case "dashboard":
        return <Dashboard />;
      default:
        return (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <h1
              style={{
                fontSize: "48px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "24px",
              }}
            >
              JSX Without React
            </h1>
            <p
              style={{
                fontSize: "20px",
                color: "#6b7280",
                marginBottom: "40px",
                maxWidth: "600px",
                margin: "0 auto 40px",
              }}
            >
              A complete TypeScript implementation of JSX runtime with
              components, state management, and real-time data visualization.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
                maxWidth: "1000px",
                margin: "40px auto",
              }}
            >
              {/* Counter Card */}
              <div
                onClick={() => navigateTo("counter")}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px",
                  padding: "32px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  color: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  Counter
                </h3>
                <p style={{ opacity: "0.9" }}>
                  Simple counter with state management. Demonstrates useState
                  hook and event handling.
                </p>
              </div>

              {/* Todo Card */}
              <div
                onClick={() => navigateTo("todo")}
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  borderRadius: "16px",
                  padding: "32px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  color: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  Todo List
                </h3>
                <p style={{ opacity: "0.9" }}>
                  Full-featured todo app with filtering. Shows component
                  composition and complex state.
                </p>
              </div>

              {/* Dashboard Card */}
              <div
                onClick={() => navigateTo("dashboard")}
                style={{
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  borderRadius: "16px",
                  padding: "32px",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  color: "#ffffff",
                }}
              >
                <h3
                  style={{
                    fontSize: "24px",
                    fontWeight: "700",
                    marginBottom: "12px",
                  }}
                >
                  Dashboard
                </h3>
                <p style={{ opacity: "0.9" }}>
                  Interactive data visualization with Canvas charts. Real-time
                  updates and multiple chart types.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      {/* Navigation */}
      {getCurrentPage() !== "home" && (
        <nav
          style={{
            backgroundColor: "#ffffff",
            padding: "16px 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={() => navigateTo("home")} variant="secondary">
              Home
            </Button>
            <Button
              onClick={() => navigateTo("counter")}
              variant={getCurrentPage() === "counter" ? "primary" : "secondary"}
            >
              Counter
            </Button>
            <Button
              onClick={() => navigateTo("todo")}
              variant={getCurrentPage() === "todo" ? "primary" : "secondary"}
            >
              Todo
            </Button>
            <Button
              onClick={() => navigateTo("dashboard")}
              variant={
                getCurrentPage() === "dashboard" ? "primary" : "secondary"
              }
            >
              Dashboard
            </Button>
          </div>
        </nav>
      )}

      {/* Page Content */}
      <div>{renderPage()}</div>
    </div>
  );
};

// Mount the app
const root = document.getElementById("app");
if (root) {
  const appVNode = (<Router />) as unknown as VNode;
  mount(appVNode, root);

  console.log("App mounted successfully!");
} else {
  console.error("Root element not found!");
}
