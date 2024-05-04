import { NextResponse } from "next/server"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import supabaseServer from "../../../libs/supabaseServer"
import { createClient } from "@supabase/supabase-js"
import { ChatOpenAI } from "@langchain/openai"
// import { Replicate } from "@langchain/community/llms/replicate"

// const replicate = new Replicate()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
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
      .select("has_access, query_count")
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

    if (profile.query_count >= 50) {
      return NextResponse.json(
        { content: "Query count exceeded", status: 429 },
        { status: 429 }
      )
    }

    const payload = await req.json()

    const model = new ChatOpenAI({
      modelName: "gpt-4-turbo",
      temperature: 0,
      maxTokens: 500,
    })

    const prompt = ChatPromptTemplate.fromTemplate(
      `You are an excellent writer and also an excellent grader of writing. Grade the following writing on a scale of 1-100 based on coherence. Also, rewrite the passage in a simple, concise and coherent way. Do not use colons or semicolons in your writing. In the suggestion only include your rewritten suggestion of the passage and nothing else. Format your response as a JSON object with "rating", "feedback", and "suggestion" fields. Only use words and no markdown or anything else like that. Passage: {input}`
    )
    const chain = prompt.pipe(model)
    const response = await chain.invoke({
      input: `${payload.text}`,
    })
    const content = response.content
    const { rating, feedback, suggestion } = JSON.parse(content)
    console.log({ rating, feedback, suggestion })

    await supabase
      .from("profiles")
      .update({ query_count: profile.query_count + 1 })
      .eq("id", user.id)

    return NextResponse.json({ rating, feedback, suggestion, status: 201 })
  } catch (error) {
    console.error("Error fetching explanation:", error)
    return NextResponse.json({ content: "OpenAIError", status: 500 })
  }
}
