"use client"
import React, { useState } from "react"
import ColorPicker from "react-best-gradient-color-picker"
import { Rnd } from "react-rnd"

const BentoGrid = () => {
  const defaultTile = {
    title: "New Title",
    width: 200,
    height: 100,
    fontSize: 16,
    fontFamily: "Arial",
    textAlign: "center",
    dropShadow: true,
    alignItems: "flex-start", // Changed property name to alignItems
    backgroundColor: "lightgray",
  }

  const style = {
    display: "flex",
    justifyContent: "center",
    border: "solid 1px #ddd",
    borderRadius: "20px",
    overflow: "hidden",
    backgroundColor: "lightgray",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  }

  const [color, setColor] = useState("#ffffff")
  const [tiles, setTiles] = useState([{ id: Date.now(), ...defaultTile }])
  const [selectedTile, setSelectedTile] = useState(null)
  const [backgroundSelected, setBackgroundSelected] = useState(false)
  const [selectedColor, setSelectedColor] = useState("#ffffff")

  const handleClick = (id, event) => {
    // Ensure event is always present and not undefined
    console.log({ color })
    if (selectedTile === id) {
      // If the clicked tile is already selected, deselect it
      setSelectedTile(null)
      setBackgroundSelected(false)
    } else {
      // If the clicked tile is not selected, select it
      setSelectedTile(id)
      setBackgroundSelected(false)

      // Find the newly selected tile
      const newSelectedTile = tiles.find((tile) => tile.id === id)

      // Update selectedColor to the background color of the new tile
      setSelectedColor(newSelectedTile.backgroundColor)
    }
  }

  const handleTileClick = (id) => {
    // Prevent deselection when clicking inside the tile
    setSelectedTile(id)
    setBackgroundSelected(false)

    // Find the clicked tile
    const clickedTile = tiles.find((tile) => tile.id === id)

    // Update selectedColor to the background color of the clicked tile
    setSelectedColor(clickedTile.backgroundColor)
  }

  const backgroundSelectedFunc = () => {
    if (backgroundSelected) {
      // If background is already selected, deselect it
      setBackgroundSelected(false)
    } else {
      // If background is not selected, select it
      setSelectedTile(null)
      setBackgroundSelected(true)
    }
  }

  const addTitle = () => {
    setTiles([...tiles, { id: Date.now(), ...defaultTile }])
  }

  const handleTitleChange = (id, event) => {
    const newTitle = event.target.value
    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, title: newTitle } : tile
    )
    setTiles(newTiles)
  }
  const handlePropertyChange = (id, property, value) => {
    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, [property]: value } : tile
    )

    if (property === "backgroundColor") {
      // Update background color of the selected tile only
      const updatedTiles = newTiles.map((tile) => {
        if (tile.id === id) {
          console.log(
            `Setting background color for tile with id ${id} to ${value}`
          )
          console.log({ value })
          return { ...tile, backgroundColor: value }
        } else {
          return tile
        }
      })

      setTiles(updatedTiles)
    } else {
      setTiles(newTiles)
    }
  }

  // const handlePropertyChange = (id, property, value) => {
  //   const newTiles = tiles.map((tile) =>
  //     tile.id === id ? { ...tile, [property]: value } : tile
  //   )

  //   if (property === "backgroundColor") {
  //     // Update background color of the selected tile only
  //     const updatedTiles = newTiles.map((tile) =>
  //       tile.id === id ? { ...tile, backgroundColor: value } : tile
  //     )

  //     setTiles(updatedTiles)
  //   } else {
  //     setTiles(newTiles)
  //   }
  // }

  const verticalAlignOptions = [
    { label: "Top", value: "flex-start" },
    { label: "Center", value: "center" },
    { label: "Bottom", value: "flex-end" },
  ]

  const bringToFront = () => {
    if (selectedTile) {
      const selectedIdx = tiles.findIndex((tile) => tile.id === selectedTile)
      const updatedTiles = [
        ...tiles.slice(0, selectedIdx),
        ...tiles.slice(selectedIdx + 1),
        tiles[selectedIdx],
      ]
      setTiles(updatedTiles)
    }
  }

  const sendToBack = () => {
    if (selectedTile) {
      const selectedIdx = tiles.findIndex((tile) => tile.id === selectedTile)
      const updatedTiles = [
        tiles[selectedIdx],
        ...tiles.slice(0, selectedIdx),
        ...tiles.slice(selectedIdx + 1),
      ]
      setTiles(updatedTiles)
    }
  }

  return (
    <div className="flex items-start h-screen bg-gray-100 p-6">
      <div className="mr-2 bg-white rounded shadow w-36">
        <button
          className={`text-left pb-2 py-2 px-6 text-md w-full hover:bg-gray-200 hover:rounded transition duration-300 ${
            backgroundSelected ? "bg-gray-300" : ""
          }`}
          onClick={backgroundSelectedFunc}
        >
          Background
        </button>
        <div>
          {tiles.map((tile) => (
            <button
              key={tile.id}
              className={`text-left pb-2 py-2 px-6 text-md w-full hover:bg-gray-200 hover:rounded transition ${
                selectedTile === tile.id ? "bg-gray-300" : ""
              }`}
              onClick={() => handleClick(tile.id)}
            >
              {tile.title ? (
                tile.title.length > 9 ? (
                  tile.title.slice(0, 9) + "..."
                ) : (
                  tile.title
                )
              ) : (
                <i>No Name</i>
              )}
            </button>
          ))}
          <button
            className="text-left mb-2 py-2 px-6 text-md w-full hover:bg-gray-200 hover:rounded transition"
            onClick={addTitle}
          >
            +
          </button>
        </div>
      </div>
      <div className="mr-2 bg-white p-6 rounded shadow w-3/12 h-auto overflow-scroll max-h-[75vh]">
        <h2 className="text-center mb-4 text-lg font-semibold">Properties</h2>
        {backgroundSelected === false && selectedTile === null ? (
          <div>Nothing selected</div>
        ) : backgroundSelected ? (
          <div className="mb-4">
            <label htmlFor="backgroundColor" className="block mb-1">
              Background Color:
            </label>
            <ColorPicker value={color} onChange={setColor} />
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="fontSize" className="block mb-1">
                Font Size:
              </label>
              <input
                type="number"
                id="fontSize"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.fontSize || ""
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "fontSize",
                    parseInt(e.target.value)
                  )
                }
                min="10"
                max="100"
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fontFamily" className="block mb-1">
                Font Family:
              </label>
              <select
                id="fontFamily"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.fontFamily ||
                  ""
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "fontFamily",
                    e.target.value
                  )
                }
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Times">Times</option>
                <option value="Courier New">Courier New</option>
                <option value="Courier">Courier</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Palatino">Palatino</option>
                <option value="Garamond">Garamond</option>
                <option value="Bookman">Bookman</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Impact">Impact</option>
                <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Geneva">Geneva</option>
                <option value="Lucida Grande">Lucida Grande</option>
                <option value="Arial Narrow">Arial Narrow</option>
                <option value="Century Gothic">Century Gothic</option>
                <option value="Century">Century</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="textAlign" className="block mb-1">
                Text Align:
              </label>
              <select
                id="textAlign"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.textAlign ||
                  "left"
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "textAlign",
                    e.target.value
                  )
                }
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="alignVertical" className="block mb-1">
                Vertical Align:
              </label>
              <select
                id="alignVertical"
                value={
                  tiles.find((tile) => tile.id === selectedTile)?.alignItems ||
                  "flex-start"
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "alignItems",
                    e.target.value
                  )
                }
                className="w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                {verticalAlignOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dropShadow" className="block mb-1">
                Drop Shadow:
              </label>
              <input
                type="checkbox"
                id="dropShadow"
                checked={
                  tiles.find((tile) => tile.id === selectedTile)?.dropShadow ||
                  false
                }
                onChange={(e) =>
                  handlePropertyChange(
                    selectedTile,
                    "dropShadow",
                    e.target.checked
                  )
                }
                className="mr-2"
              />
            </div>
            <ColorPicker
              value={selectedColor}
              onChange={(color) => {
                setSelectedColor(color)
                handlePropertyChange(selectedTile, "backgroundColor", color)
              }}
              className={"mb-5"}
            />
            <div className="flex justify-between gap-2">
              <button
                className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={bringToFront}
              >
                Bring to Front
              </button>
              <button
                className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={sendToBack}
              >
                Send to Back
              </button>
            </div>
          </>
        )}
      </div>
      <div
        style={{
          background: color,
          width: "calc(100vw - 600px)",
          height: "75vh",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
          borderRadius: "20px",
          padding: "20px",
          overflow: "auto",
        }}
        className="border border-gray-300"
      >
        {tiles.map((tile) => (
          <Rnd
            bounds={"parent"}
            key={tile.id}
            style={{
              ...style,
              fontSize: tile.fontSize,
              fontFamily: tile.fontFamily,
              textAlign: tile.textAlign,
              border: selectedTile === tile.id ? "1px solid blue" : "none",
              boxShadow: tile.dropShadow
                ? "2px 2px 4px rgba(0, 0, 0, 0.1)"
                : "none",
              alignItems: tile.alignItems,
              background: tile.backgroundColor,
            }}
            default={{
              x: 20,
              y: 20,
              width: tile.width,
              height: tile.height,
            }}
            onClick={() => handleTileClick(tile.id)}
          >
            <div>
              <input
                type="text"
                value={tile.title}
                onChange={(e) => handleTitleChange(tile.id, e)}
                className="outline-none"
                style={{
                  background: "transparent",
                  border: "none",
                  width: "100%",
                  textAlign: tile.textAlign,
                  alignSelf: "center",
                }}
              />
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  )
}

export default BentoGrid
