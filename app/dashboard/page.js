import ButtonAccount from "@/components/ButtonAccount"
import Subscribe from "@/components/Subscribe"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import Image from "next/image"
import logo from "@/app/icon.png"
import IdeaInput from "@/components/IdeaInput"

export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  try {
    // const supabase = createServerComponentClient({ cookies })

    // const {
    //   data: { session },
    // } = await supabase.auth.getSession()

    // const { data: profiles, error } = await supabase
    //   .from("profiles")
    //   .select("has_access")
    //   .eq("id", session.user.id)

    // if (error) {
    //   throw new Error(error.message)
    // }

    // const userAccess = profiles[0].has_access
    const userAccess = true

    if (userAccess) {
      return (
        <main className="min-h-screen p-8 pb-0 overscroll-hidden">
          <header className="mb-6 flex items-center">
            <ButtonAccount />
          </header>
          <IdeaInput />
        </main>
      )
    } else {
      return <Subscribe />
    }
  } catch (error) {
    console.error("Error in Dashboard:", error.message)
    return <Subscribe />
  }
}
