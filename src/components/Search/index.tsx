import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, MicIcon, XIcon } from "lucide-react";
import Input from "../ui/input";

export default function Search() {
  const [query, setQuery] = useState("");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      // Retrieve selected filters from localStorage
      const filters = JSON.parse(
        localStorage.getItem("selectedFilters") || "[]"
      );
      const response = await fetch("https://zawjen.app.net/search-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_text: query, filters }),
      });
      const data = await response.json();
      // Navigate to results page (using your routing solution)
      // For example: router.push('/results', { state: { data } });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="bg-foreground py-4 px-2 flex items-center gap-2">
      <Input onChange={handleOnChange} />
      <Button
        variant="default"
        onClick={handleSearch}
        data-testid="search-button"
      >
        <SearchIcon size={16} />
        <span className="hidden md:inline">Search</span>
      </Button>
    </div>
  );
}
