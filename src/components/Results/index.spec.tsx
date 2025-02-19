import { render, fireEvent, screen } from "@testing-library/react";
import Results from "./index";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Results Component", () => {
  const resultData = {
    search_text: "Hadith",
    search_filters: ["Language: English"],
    match_count: 100,
    total_pages: 10,
    current_page: 1,
    datasets: [
      {
        format: "Book",
        type: "Religion",
        classification: "Green",
        language: "Arabic",
        date_created: "2024-01-01",
        date_updated: "2024-02-01",
        locations: [{ text: "Hadith text here..." }],
      },
    ],
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { data: JSON.stringify(resultData) },
    });
  });

  it("renders results correctly", () => {
    render(<Results />);
    expect(screen.getByText("Search: Hadith")).toBeTruthy();
    expect(screen.getByText("100 results")).toBeTruthy();
    expect(screen.getByText("Page 1 of 10")).toBeTruthy();
    expect(screen.getByText("Format: Book")).toBeTruthy();
  });

  // Additional tests can simulate button clicks for download, copy, and share
});
