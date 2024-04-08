"use client"
import React, { useState } from "react"
import { Rnd } from "react-rnd"

const BentoGrid = () => {
  // State to hold the color
  const [color, setColor] = useState("#ffffff")
  // State to hold the tiles and sizes
  const [tiles, setTiles] = useState([
    { id: 1, title: "New Title", width: 200, height: 100 },
  ])

  // Function to handle click on the change color button
  const handleChangeColor = () => {
    // Generate a random color
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16)
    setColor(randomColor)
  }

  // Function to handle click on a grid item
  const handleClick = (id) => {
    // Find the tile index
    const index = tiles.findIndex((tile) => tile.id === id)
    // Move the clicked tile to the end of the array to ensure it's rendered on top
    const updatedTiles = [
      ...tiles.slice(0, index),
      ...tiles.slice(index + 1),
      tiles[index],
    ]
    setTiles(updatedTiles)
  }

  // Function to add a new title
  const addTitle = () => {
    setTiles([
      ...tiles,
      { id: Date.now(), title: "New Title", width: 200, height: 100 },
    ])
  }

  // Function to handle tile resize

  const onResize = (id, direction, ref, delta, position) => {
    const { width, height } = ref.style
    const newWidth = parseInt(width, 10) + delta.width
    const newHeight = parseInt(height, 10) + delta.height

    const newTiles = tiles.map((tile) =>
      tile.id === id
        ? {
            ...tile,
            width: newWidth,
            height: newHeight,
            ...position,
          }
        : tile
    )
    setTiles(newTiles)
  }

  return (
    <div className="flex items-start h-screen">
      {/* Button to add new title */}
      <div className="mr-6">
        <button
          onClick={addTitle}
          className="p-2 bg-blue-500 text-white rounded-md mb-4"
        >
          Add Title
        </button>
        {/* Button to change color */}
        <button
          onClick={handleChangeColor}
          className="p-2 bg-blue-500 text-white rounded-md mb-4"
        >
          Change Color
        </button>
      </div>
      {/* Grid section */}
      <div
        style={{ backgroundColor: color, width: "100vw", height: "75vh" }}
        className="flex flex-wrap gap-4 p-4 border border-gray-300 rounded-lg overflow-auto"
      >
        {tiles.map((tile) => (
          <Rnd
            key={tile.id}
            size={{ width: tile.width, height: tile.height }}
            minWidth={50}
            minHeight={50}
            bounds="parent"
            onResize={(e, direction, ref, delta, position) =>
              onResize(tile.id, direction, ref, delta, position)
            }
            enableResizing={{
              bottomRight: true, // Only allow resizing on the southeast (se) corner
            }}
            className="rounded-xl border-2 border-gray-300 bg-gray-100 p-0 hover:bg-gray-200 transition duration-300 ease-in-out cursor-move"
            // Pass a ref callback to capture the DOM element being resized
            ref={(c) => (tile.ref = c)}
          >
            <div
              onClick={() => handleClick(tile.id)}
              style={{ padding: 0, margin: 0 }}
            >
              <span>{tile.title}</span>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  )
}

export default BentoGrid
