import { MouseEvent, ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClick?: (e: MouseEvent) => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, onClick }) => {
  return (
    <div
      role="dialog"
      className={`fixed top-0 w-4/5 h-full bg-neutral-50 rounded-lg shadow-lg transform transition-transform duration-500 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
