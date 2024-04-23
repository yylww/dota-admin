import { lusitana } from "@/app/fonts"; 
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth()
  
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
    </main>
  );
}