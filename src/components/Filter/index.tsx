import { FormEvent, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useMainContext } from "@/context";
import Backdrop from "../Backdrop";
import Modal from "../Modal";
import { MicIcon, XIcon } from "lucide-react";

interface Filter {
  name: string;
  options: string[];
}

export default function FilterScreen() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const mainContext = useMainContext();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/mock");

        const data = await res.json();
        setFilters(data.filters);
        const saved = localStorage.getItem("selectedFilters");
        if (saved) {
          setSelectedFilters(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const toggleFilter = (filterName: string, option: string) => {
    const currentOptions = selectedFilters[filterName] || [];
    const updatedOptions = currentOptions.includes(option)
      ? currentOptions.filter((opt) => opt !== option)
      : [...currentOptions, option];
    setSelectedFilters({ ...selectedFilters, [filterName]: updatedOptions });
  };

  const handleApplyFilters = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      localStorage.setItem("selectedFilters", JSON.stringify(selectedFilters));
      // Navigate back to the search screen
      // window.location.assign("/");
    } catch (error) {
      console.error("Error saving filters:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        mainContext?.setIsFilterOn(false);
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-screen p-2 overflow-x-hidden ">
        <div className="whitespace-nowrap overflow-x-auto flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => console.log("Voice input triggered")}
            data-testid="audio-button"
          >
            <MicIcon size={16} />
          </Button>
          <Button
            data-testid="filter-button"
            variant="secondary"
            onClick={() => {
              // window.location.assign("/filter")
              if (mainContext) {
                mainContext.setIsFilterOn(!mainContext.isFilterOn);
              }
            }}
          >
            Filter
          </Button>
          {mainContext?.filters?.map((filter, index) => (
            <Button
              className="border-foreground rounded-full mr-2"
              variant={"outline"}
              key={index}
            >
              {filter}
              <XIcon className="text-foreground" />
            </Button>
          ))}
        </div>
      </div>
      <Backdrop
        isOpen={mainContext?.isFilterOn ?? false}
        onClick={() => mainContext?.setIsFilterOn(false)}
      >
        <Modal
          isOpen={mainContext?.isFilterOn ?? false}
          onClick={(e) => e.stopPropagation()}
        >
          <form
          data-testid="filter-modal"
            onSubmit={handleApplyFilters}
            className="p-4 text-neutral-800 grid grid-columns-1 grid-rows-[60px_50%_100px] "
          >
            <div className="border-b-2 border-gray-100 py-4">
              <h2 className="font-bold text-lg">Filter by</h2>
            </div>
            <div className="h-5/6 w-full overflow-y-auto overscroll-y-none">
              {filters.map((filter, index) => (
                <div key={index} className="my-4">
                  <h3 className="font-bold">{filter.name}</h3>
                  {filter.options.map((option, idx) => (
                    <label
                      key={idx}
                      htmlFor={filter.name + idx}
                      className="py-2 flex items-center"
                    >
                      <Checkbox
                        className="border-neutral-300 mr-2"
                        checked={
                          selectedFilters[filter.name]?.includes(option) ||
                          false
                        }
                        onCheckedChange={() =>
                          toggleFilter(filter.name, option)
                        }
                        data-testid={`checkbox-${filter.name}-${option}`}
                        id={filter.name + idx}
                      />
                      <span className="cursor-pointer">{option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center py-4">
              <Button
                className="sm:w-1/5"
                type="submit"
                data-testid="apply-filters-button"
                isLoading={isLoading}
              >
                Apply Filters
              </Button>
            </div>
          </form>
        </Modal>
      </Backdrop>
    </>
  );
}
