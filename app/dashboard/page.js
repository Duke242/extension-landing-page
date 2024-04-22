import ButtonAccount from "@/components/ButtonAccount"
import Subscribe from "@/components/Subscribe"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  try {
    const supabase = createServerComponentClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("has_access")
      .eq("id", session.user.id)

    if (error) {
      throw new Error(error.message)
    }

    const userAccess = profiles[0].has_access
    console.log({ userAccess })

    if (userAccess) {
      return (
        <main className="min-h-screen p-8 pb-0 overscroll-hidden">
          <header className="mb-6 flex items-center">
            <ButtonAccount />
          </header>
          <p className="text-center text-gray-600 text-lg">
            Download the{" "}
            <a
              href="https://example.com/wriiter-extension"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500"
            >
              Wriiter Chrome Extension
            </a>{" "}
            for a better writing experience!
          </p>
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
