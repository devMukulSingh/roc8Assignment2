import dynamic from "next/dynamic";
const EmailBody  = dynamic( () => import("./components/EmailBody"),{ssr:false})
const EmailsSection = dynamic( () => import("./components/EmailsSection"),{ssr:false})

export default async function Home() {
  const emails = await fetch(`https://flipkart-email-mock.now.sh/`).then(
    (res) => res.json()
  );

  return (
    <div className="flex  gap-5 mt-5">
      <EmailsSection emails={emails.list}/>
      <EmailBody/>
    </div>
  );
}
