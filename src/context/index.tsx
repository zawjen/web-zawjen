import { createContext, JSX, ReactNode, useContext, useState } from "react";

interface IMainContext {
  isFilterOn: boolean;
  setIsFilterOn: (isFilterOn: boolean) => void;
  filters: string[];
  setFilters: (filters: string[]) => void;
}

const MainContext = createContext<IMainContext | null>(null);

export const useMainContext = () => useContext(MainContext);

export const MainContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <MainContext.Provider
      value={{ isFilterOn, setIsFilterOn, filters, setFilters }}
    >
      {children}
    </MainContext.Provider>
  );
};
