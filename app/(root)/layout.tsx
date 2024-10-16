import { ReactNode } from "react";
import Header from "./components/Header";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <main className="p-3 sm:p-5 md:px-10 md:py-5 ">
      <Header />
      {children}
    </main>
  );
}
