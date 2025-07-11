import { createContext, useContext, useState} from "react";
import type { ReactNode } from "react";

type SearchContextProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const SearchContext = createContext<SearchContextProps>({} as SearchContextProps);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
