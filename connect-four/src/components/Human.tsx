import React, { useState } from 'react'
import GameLayout from './GameLayout'
import Table from './Table'
import { useGameLogic } from '../hooks/useGameLogic'
import "./style/Modal.css"


export default function Human() {
const {
table,
player,
winner,
count,
points1,
points2,
makeMove,
restart,
returnCell,
changePlayer,
setPlayer,
} = useGameLogic()


const [showModal, setShowModal] = useState(false)


React.useEffect(() => {
if (winner !== 0) {
const timer = setTimeout(() => setShowModal(true), 500)
return () => clearTimeout(timer)
}
}, [winner])


return (
<>
<GameLayout player={player} points1={points1} points2={points2} winner={winner} restart={restart} modeLabel="Игрок 2">
<Table table={table} makeMove={(col: number) => {
makeMove(col, player)
setPlayer(changePlayer(player))
}} player={player} winner={winner} returnCell={returnCell} />
</GameLayout>


{showModal && winner !== 0 && (
<div className="modalOverlay">
<div className="modal">
<h2>Победил игрок {winner}!</h2>
<button onClick={() => { restart(); setShowModal(false) }}>Играть снова</button>
</div>
</div>
)}


{!showModal && count === 6 * 7 && (
<div className="modalOverlay">
<div className="modal">
<h2>Ничья</h2>
<button onClick={() => { restart(); setShowModal(false) }}>Играть снова</button>
</div>
</div>
)}
</>
)
}