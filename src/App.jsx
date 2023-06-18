import { useState } from 'react'
import './App.css'

function App() {
  const [coords, setCoords] = useState([])
  const [removedCoords, setRemovedCoords] = useState([])

  const addCircle = (e) => {
    const { clientX, clientY } = e
    setCoords([...coords, { x: clientX, y: clientY }])
  }

  const undo = (e) => {
    e.stopPropagation() // заборона спливання подій, тобто подія додавання кружка не виконується
    e.preventDefault()  // заборона відкриння контекстного меню
    if (coords.length == 0) return
    setRemovedCoords([...removedCoords, coords.pop()])
    setCoords([...coords])
  }

  const redo = (e) => {
    e.stopPropagation()
    if (removedCoords.length == 0) return
    const redoCoord = removedCoords.pop()
    setRemovedCoords([...removedCoords])
    setCoords([...coords, redoCoord])
  }

  return (
    <>
      <div
        style={{ position: 'relative' }}
        className='wrapper'
        onContextMenu={(e) => undo(e)}
        onClick={(e) => addCircle(e)}
      >
        <button onClick={(e) => undo(e)} disabled={coords.length == 0 ? true : false}>Undo</button>
        <button onClick={(e) => redo(e)} disabled={removedCoords.length == 0 ? true : false}>Redo</button>
        {coords.map((coord) => {
          return <div className='circle' style={{ left: coord.x - 5, top: coord.y - 5 }} key={Math.random() * 100}></div>
        })}
      </div>
    </>
  )
}

export default App
