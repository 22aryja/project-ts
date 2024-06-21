import "./input.scss";

interface InputProps {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  type: "text" | "email" | "password";
}

function Input({ value, label, onChange, type }: InputProps) {
  return (
    <div>
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-input"
        required
        type={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
    </div>
  );
}

export default Input;
