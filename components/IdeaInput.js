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
    "What's your wildest idea?",
    "What problem are you itching to solve?",
  ]
  const getRandomPlaceholder = () => {
    const randomIndex = Math.floor(Math.random() * placeholders.length)
    return placeholders[randomIndex]
  }

  const randomPlaceholder = getRandomPlaceholder()

  return <input type="text" placeholder={randomPlaceholder} />
}

export default IdeaInput
