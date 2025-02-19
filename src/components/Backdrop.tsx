import { ReactNode } from "react";

interface IBackdropProps {
  children: ReactNode;
  isOpen: boolean;
  onClick?: () => void;
}

const Backdrop: React.FC<IBackdropProps> = ({ children, isOpen, onClick }) => {
  return (
    <div
      role="presentation"
      className={`fixed flex justify-center inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Backdrop;
