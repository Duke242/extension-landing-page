import { NextResponse } from "next/server"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import supabaseServer from "../../../libs/supabaseServer"
import { createClient } from "@supabase/supabase-js"
import { ChatOpenAI } from "@langchain/openai"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    // const token = req.headers.get("Authorization")?.replace("Bearer ", "")
    // const decodedToken = decodeURIComponent(token)
    // console.log({ decodedToken })
    // Check if the user is authenticated
    const {
      data: { user },
      error,
    } = await supabaseServer().auth.getUser()

    // console.log({ user })

    if (error || !user) {
      return NextResponse.json(
        { content: "Unauthorized", status: 401 },
        { status: 401 }
      )
    }

    // Retrieve the user's profile data
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("has_access")
      .eq("id", user.id)
      .single()

    // console.log({ profile })

    if (profileError) {
      console.error("Error fetching user profile:", profileError)
      return NextResponse.json(
        { content: "Internal Server Error", status: 500 },
        { status: 500 }
      )
    }

    // Check if the user has access based on the has_access value
    if (!profile.has_access) {
      return NextResponse.json(
        { content: "Access Denied", status: 403 },
        { status: 403 }
      )
    }

    const payload = await req.json()

    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
      maxTokens: 4096,
    })

    const prompt = ChatPromptTemplate.fromTemplate(
      `You are an excellent writer. Rate the following passage on a scale of 1-100. Provide feedback on why it's not great and how to improve it. Also, suggest a better way to write this, aiming to make it more simple and concise. Format your response as a JSON object with "rating", "feedback", and "suggestion" fields. Passage: {input}`
    )
    const chain = prompt.pipe(model)
    const response = await chain.invoke({
      input: `${payload.text}`,
    })
    const content = response.content
    const { rating, feedback, suggestion } = JSON.parse(content)
    console.log({ rating, feedback, suggestion })

    return NextResponse.json({ rating, feedback, suggestion, status: 201 })
  } catch (error) {
    console.error("Error fetching explanation:", error)
    return NextResponse.json({ content: "OpenAIError", status: 500 })
  }
}
