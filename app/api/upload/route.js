import path from "path"
import { writeFile } from "fs/promises"
import { auth } from "@/auth"

export const POST = auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  if (isLoggedIn) {
    const searchParams = req.nextUrl.searchParams
    const des = searchParams.get('des')
    const formData = await req.formData()

    const file = formData.get("file")
    if (!file) {
      return Response.json({ error: "No files received.", status: 400 })
    }
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name.replaceAll(" ", "_")
    try {
      await writeFile(path.join(process.cwd(), `public/${des}/` + filename), buffer)
      return Response.json({ 
        message: "Success", 
        status: 200, 
        url: `/${des}/${filename}`,
      })
    } catch (error) {
      console.log("Error occured ", error)
      return Response.json({ message: error.message, status: 500 })
    }
  } else {
    return Response.json({ message: "Authentication failed", status: 401 })
  }
})