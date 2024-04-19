import { cookies } from "next/headers"
import { NextResponse } from "next/server"
export async function POST(req) {
  const payload = await req.json()
  const { data } = payload
  console.log({ data })

  return new NextResponse({
    status: 200,
    json: { message: "Data received successfully!" },
  })
}
