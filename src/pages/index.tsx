import { Geist, Geist_Mono } from "next/font/google";
import Search from "@/components/Search";
import Filter from "@/components/Filter";
import { useMainContext } from "@/context";
import Head from "next/head";
import Backdrop from "@/components/Backdrop";
import Modal from "@/components/Modal";
import Results from "@/components/Results";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const mainContext = useMainContext();
  return (
    <>
      <Head>
        <title>Zawjen</title>
      </Head>
      <div
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[125px_1fr] items-center justify-items-center w-full min-h-screen pb-20 gap-2 font-[family-name:var(--font-geist-sans)]`}
      >
        <header className="w-full">
          <Search />
          <Filter />
        </header>
        <main className="h-full w-full flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Results />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </>
  );
}
