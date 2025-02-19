import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  within,
} from "@testing-library/react";
import FilterScreen from "./index";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        filters: [
          { name: "Language", options: ["English", "Arabic"] },
          { name: "Classification", options: ["Green", "Yellow", "Red"] },
        ],
      }),
  })
) as jest.Mock;

describe("Filter Component", () => {
  beforeEach(() => {
    localStorage.clear();
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("fetches and displays filters", async () => {
    render(<FilterScreen />);
    const filterButton = screen.getByTestId("filter-button");
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText("Language")).toBeTruthy();
      expect(screen.getByText("Classification")).toBeTruthy();
    });
  });

  it('allows selecting filter options and applies filters', async () => {
    render(<FilterScreen />);
    const filterButton = screen.getByTestId("filter-button");
    fireEvent.click(filterButton);
    
    await waitFor(() => screen.getByText('Language'));

    // Toggle English option
    const englishCheckbox = screen.getByTestId('checkbox-Language-English');
    fireEvent.click(englishCheckbox);
    // Click apply button
    const applyButton = screen.getByTestId('apply-filters-button');
    fireEvent.click(applyButton);
    await waitFor(() => {
      expect(localStorage.getItem('selectedFilters')).toContain('English');
    });
  });
});
