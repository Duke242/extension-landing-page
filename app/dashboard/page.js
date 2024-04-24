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
          <p className="text-center mb-4">
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
          <div className="bg-gray-200 rounded-lg p-6">
            <ol className="list-decimal pl-6 text-lg text-gray-800">
              <li>
                <p className="text-left">
                  Highlight Text: Select the text you want to get feedback on by
                  clicking and dragging your mouse over it.
                </p>
              </li>
              <li className="mt-4">
                <p className="text-left">
                  Right Click: Once you&apos;ve highlighted the text,
                  right-click on it to open the context menu.
                </p>
              </li>
              <li className="mt-4">
                <p className="text-left">
                  Select &quot;Wriiter&quot;: From the context menu, choose the
                  option labeled &quot;Wriiter.&quot;
                </p>
              </li>
              <li className="mt-4">
                <p className="text-left">
                  Review Feedback: A pop-up window will appear with quick
                  feedback on your highlighted text. Take a moment to review the
                  feedback provided.
                </p>
              </li>
              <li className="mt-4">
                <p className="text-left">
                  Revise as Needed: Use the feedback to make any necessary
                  revisions or improvements to your writing.
                </p>
              </li>
              <li className="mt-4">
                <p className="text-left">
                  Continue Writing: After reviewing the feedback, continue
                  writing or editing your document as needed.
                </p>
              </li>
              <li className="mt-4">
                <p className="text-left">
                  Note: Wriiter provides quick feedback to help improve your
                  writing. However, it&apos;s always a good idea to carefully
                  review and revise your work for clarity, coherence, and
                  accuracy.
                </p>
              </li>
            </ol>
          </div>
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
