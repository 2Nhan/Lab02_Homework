/** @jsx createElement */
import { createElement } from "./jsx-runtime";

interface CardProps {
  title?: string;
  children?: any;
  className?: string;
  onClick?: () => void;
}

const Card = ({ title, children, className, onClick }: CardProps) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {title && (
        <h3
          style={{
            fontWeight: "700",
            fontSize: "20px",
            marginBottom: "16px",
            color: "#1f2937",
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ fontSize: "14px", color: "#4b5563" }}>{children}</div>
    </div>
  );
};


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: any;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;


  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "1000",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "500px",
          width: "90%",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          position: "relative",
        }}
        onClick={(e: Event) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#6b7280",
          }}
        >
          ✕
        </button>

        {/* Title */}
        {title && (
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "700",
              color: "#1f2937",
            }}
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};


interface FormProps {
  onSubmit: (e: Event) => void;
  children?: any;
  className?: string;
}

const Form = ({ onSubmit, children, className }: FormProps) => {
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};


interface InputProps {
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  required,
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onInput={(e: any) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      required={required}
      style={{
        width: "100%",
        padding: "12px 16px",
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.2s",
      }}
    />
  );
};


interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  children?: any;
  className?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  type = "button",
  variant = "primary",
  children,
  className,
  disabled,
}: ButtonProps) => {
  const variants = {
    primary: { background: "#3b82f6", color: "#ffffff" },
    secondary: { background: "#6b7280", color: "#ffffff" },
    danger: { background: "#ef4444", color: "#ffffff" },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
      style={{
        ...variants[variant],
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? "0.5" : "1",
        transition: "all 0.2s",
      }}
    >
      {children}
    </button>
  );
};


interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

const Select = ({ value, onChange, options, className }: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      className={className}
      style={{
        width: "100%",
        padding: "12px 16px",
        border: "2px solid #e5e7eb",
        borderRadius: "8px",
        fontSize: "16px",
        outline: "none",
        cursor: "pointer",
        backgroundColor: "#ffffff",
      }}
    >
      {options.map((opt) => (
        <option value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export { Card, Modal, Form, Input, Button, Select };