import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req) => {
  const searchParams = req.nextUrl.searchParams
  const des = searchParams.get('des')
  const formData = await req.formData();

  const file = formData.get("file");
  console.log(des, file)
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);
  try {
    await writeFile(
      path.join(process.cwd(), `public/${des}/` + filename),
      buffer
    );
    return NextResponse.json({ message: "Success", status: 201, url: `/${des}/${filename}` });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};