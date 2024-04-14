"use client"
import React, { useState } from "react"

function IdeaInput() {
  const placeholders = [
    "What are you thinking of creating?",
    "Got any exciting project ideas?",
    "What's on your mind for a new creation?",
    "Looking for inspiration? What's your next big idea?",
    "What kind of project are you envisioning?",
    "Wondering what to create next?",
    "What sparks your creativity?",
    "What's your next big innovation?",
    "What problem are you itching to solve?",
  ]

  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length)
    return placeholders[randomIndex]
  }

  const [inputValue, setInputValue] = useState("")

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/getData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: inputValue }),
      })
      if (response.ok) {
        console.log("Data sent successfully!")
      } else {
        console.error("Error sending data:", response.statusText)
      }
    } catch (error) {
      console.error("Error sending data:", error.message)
    }
  }

  const randomPlaceholder = getRandomPlaceholder()

  return (
    <div>
      <input
        type="text"
        placeholder={randomPlaceholder}
        value={inputValue}
        onChange={handleChange}
        className="block mx-auto w-3/4 h-10 rounded-lg text-left p-4 py-8 text-2xl shadow-lg focus:shadow-2xl border-2 border-blue-500 border-gradient"
      />
      <button
        onClick={handleSubmit}
        className="block mx-auto mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  )
}

export default IdeaInput
