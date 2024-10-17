import dynamic from "next/dynamic";
const Pagination = dynamic( () => import("./components/Pagination"), {ssr:false} ) 
const EmailBody = dynamic(() => import("./components/EmailBody"), {
  ssr: false,
});
const EmailsSection = dynamic(() => import("./components/EmailsSection"), {
  ssr: false,
});

export default function Home() {

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] mt-5">
      <div className="flex gap-5">
        <EmailsSection />
        <EmailBody />
      </div>
      <Pagination />
    </div>
  );
}
