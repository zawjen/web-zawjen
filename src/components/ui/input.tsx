import { useState, useRef } from "react";
import { InputBase } from "@/components/ui/input-base"; // shadcn Input component
import { Button } from "@/components/ui/button"; // shadcn Button component
import { X } from "lucide-react"; // For the clear (X) icon

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IInputProps> = (props) => {
  const [query, setQuery] = useState<string>(""); // State for input value
  const inputRef = useRef<HTMLInputElement>(null); // Ref for input element

  // Handle input change
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // Clear input field when clear button is clicked
  const handleClear = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white flex items-center rounded-lg border">
      <InputBase
        {...props}
        ref={inputRef}
        value={query}
        type="text"
        placeholder="Search..."
        onChange={handleOnChange}
        className="bg-white flex-grow border-none outline-none"
        data-testid="search-input"
      />

      <Button
        variant="ghost"
        onClick={handleClear}
        data-testid="clear-button"
        className={query ? "visible" : "invisible"}
      >
        <X size={2} />
      </Button>
    </div>
  );
};

export default Input;
