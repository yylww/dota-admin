import { auth } from "@/auth"

export default async function Page() {
  const session = await auth()
  console.log(session);
  return (
    <div className="flex border">12321</div>
  )
}
