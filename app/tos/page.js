import Link from "next/link"
import { getSEOTags } from "@/libs/seo"
import config from "@/config"

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
})

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`
          Terms of Service

          Effective Date: April 22, 2024
          
          Welcome to Wriiter!
          
          These Terms of Service ("Terms") govern your use of the website located at https://wriiter.co ("Wriiter" or the "Website"), operated by Wriiter. By accessing or using Wriiter, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not access or use Wriiter.
          
          1. Description of Wriiter
          Wriiter provides artificial intelligence tools to assist you in improving your writing skills. Through quick feedback and iterative improvements, Wriiter aims to enhance your writing experience.
          
          2. User Data Collection
          Wriiter may collect and store personal information, including but not limited to your name, email address, and payment information. By using Wriiter, you consent to the collection and use of this information as outlined in our Privacy Policy.
          
          3. Non-Personal Data Collection
          Wriiter may also collect non-personal information through the use of web cookies. This information helps us improve the functionality and performance of Wriiter.
          
          4. Governing Law
          These Terms shall be governed by and construed in accordance with the laws of the United States of America.
          
          5. Updates to the Terms
          We may update these Terms from time to time without prior notice. Any changes will be effective immediately upon posting the revised Terms on Wriiter. We will notify users of any material changes via email. Your continued use of Wriiter after the posting of the updated Terms constitutes your acceptance of such changes.
          
          For more information about how we collect, use, and disclose your information, please review our Privacy Policy at https://wriiter.co/privacy-policy.
          
          Contact us at wriiter_co@proton.me 

          Thank you for using Wriiter!`}
        </pre>
      </div>
    </main>
  )
}

export default TOS
