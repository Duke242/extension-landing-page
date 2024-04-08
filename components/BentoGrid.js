"use client"
import React, { useState } from "react"
import Draggable from "react-draggable"
import { ResizableBox } from "react-resizable"

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
  const handleClick = (title) => {
    // alert(`You clicked on ${title}`)
  }

  // Function to add a new title
  const addTitle = () => {
    setTiles([
      ...tiles,
      { id: Date.now(), title: "New Title", width: 200, height: 100 },
    ])
  }

  // Function to handle tile resize
  const onResize = (id, event, data) => {
    const newTiles = tiles.map((tile) =>
      tile.id === id
        ? { ...tile, width: data.size.width, height: data.size.height }
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
          <Draggable key={tile.id} handle=".handle">
            <ResizableBox
              width={tile.width}
              height={tile.height}
              resizeHandles={["se", "sw", "ne", "nw"]}
              onResize={(event, data) => onResize(tile.id, event, data)}
              className="relative"
            >
              <div className="rounded-xl border-2 border-gray-300 bg-gray-100 p-4 hover:bg-gray-200 transition duration-300 ease-in-out">
                <div className="handle cursor-move">
                  <span onClick={() => handleClick(tile.title)}>
                    {tile.title}
                  </span>
                </div>
              </div>
            </ResizableBox>
          </Draggable>
        ))}
      </div>
    </div>
  )
}

export default BentoGrid
