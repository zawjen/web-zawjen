import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeartIcon, XIcon } from "lucide-react";
import { useMainContext } from "@/context";

interface Location {
  text: string;
}

interface Dataset {
  format: string;
  type: string;
  classification: "Green" | "Yellow" | "Red";
  language: string;
  date_created: string;
  date_updated: string;
  locations: Location[];
}

interface SearchResult {
  search_text: string;
  search_filters: string[];
  match_count: number;
  total_pages: number;
  current_page: number;
  datasets: Dataset[];
}

const resultData = {
  search_text: "Hadith",
  search_filters: ["Language: English", "Language: English2"],
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

export default function Results() {
  const mainContext = useMainContext();

  const router = useRouter();
  const query = router.query as { data?: string };
  const result: SearchResult | null =
    (query.data ? JSON.parse(query.data) : null) ?? resultData;

  mainContext?.setFilters(result?.search_filters ?? []);

  const getBackgroundColor = (classification: string) => {
    switch (classification) {
      case "Green":
        return "bg-green-100";
      case "Yellow":
        return "bg-yellow-100";
      case "Red":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  const handleDownload = (format: string) => {
    // Implement download functionality here
    console.log(`Download as ${format}`);
  };

  const handleCopyUrl = () => {
    // Implement copy URL functionality here
    console.log("Copy URL");
  };

  const handleShare = () => {
    // Implement share functionality here
    console.log("Share article");
  };

  return (
    <section className="w-screen p-4">
      <header className="overflow-x-hidden pb-4">
        <div className="whitespace-nowrap overflow-x-auto flex justify-between items-center gap-2">
          <p>{result?.match_count} results</p>
          <p>
            Page {result?.current_page} of {result?.total_pages}
          </p>
        </div>
      </header>
      <h1 className="text-2xl font-bold">Search: {result?.search_text}</h1>

      {result?.datasets.map((dataset, index) => (
        <Link href={`/detail/${index}`} key={index}>
          <div
            className={`${getBackgroundColor(
              dataset.classification
            )} block p-4 my-2 rounded`}
          >
            <h2 className="text-xl font-semibold">Format: {dataset.format}</h2>
            <p>Type: {dataset.type}</p>
            <p>Language: {dataset.language}</p>
            <p>Date Created: {dataset.date_created}</p>
            <p>Date Updated: {dataset.date_updated}</p>
            {dataset.locations.map((location, idx) => (
              <p key={idx} className="text-blue-600 underline">
                {location.text}
              </p>
            ))}
          </div>
        </Link>
      ))}

      <div className="mt-4 space-x-2">
        <Button onClick={() => handleDownload("PDF")}>Download PDF</Button>
        <Button onClick={() => handleDownload("Word")}>Download Word</Button>
        <Button onClick={() => handleDownload("PNG")}>Download PNG</Button>
      </div>
      <div className="mt-4 space-x-2">
        <Button variant="outline" onClick={handleCopyUrl}>
          Copy URL
        </Button>
        <Button variant="outline" onClick={handleShare}>
          Share
        </Button>
      </div>
    </section>
  );
}
