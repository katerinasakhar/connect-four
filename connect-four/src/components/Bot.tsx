import React, { useEffect, useState } from 'react'
import GameLayout from './GameLayout'
import Table from './Table'
import { useGameLogic } from '../hooks/useGameLogic'
import { checkWin } from '../utils/checkWin'
import "./style/Modal.css"

const HUMAN = 1
const BOT = 2

export default function Bot(){
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
        setWinner
      
    } = useGameLogic()
    const [showModal, setShowModal] = useState(false)

// bot logic: try to win, try to block, else random
function checkPotentialWin(tempTable: number[][], row: number, col: number) {
// используем ту же утилиту, но она ожидает, что клетка уже установлена
return checkWin(tempTable, row, col) !== 0
}
function botMove() {
// 1) выигрыш
for (let col = 0; col < 7; col++) {
const row = returnCell(col)
if (row === -1) continue
const temp = table.map((r) => [...r])
temp[row][col] = BOT
if (checkPotentialWin(temp, row, col)) {
makeMove(col, BOT)
setPlayer(HUMAN)
return
}
}


// 2) блок
for (let col = 0; col < 7; col++) {
const row = returnCell(col)
if (row === -1) continue
const temp = table.map((r) => [...r])
temp[row][col] = HUMAN
if (checkPotentialWin(temp, row, col)) {
makeMove(col, BOT)
setPlayer(HUMAN)
return
}
}


// 3) random
const available: number[] = []
for (let col = 0; col < 7; col++) if (returnCell(col) !== -1) available.push(col)
if (available.length > 0) {
const randomCol = available[Math.floor(Math.random() * available.length)]
makeMove(randomCol, BOT)
setPlayer(HUMAN)
}
}

useEffect(() => {
if (winner !== 0) {
const timer = setTimeout(() => setShowModal(true), 800)
return () => clearTimeout(timer)
}
}, [winner])

useEffect(() => {
if (player === BOT && winner === 0) {
const timer = setTimeout(() => botMove(), 300)
return () => clearTimeout(timer)
}
}, [player, winner, table])

return (
<>
<GameLayout player={player} points1={points1} points2={points2} winner={winner} restart={restart} modeLabel="Бот" timer={0} isTimer={false}>
<Table table={table} makeMove={(col: number) => {
makeMove(col, player)
setPlayer(changePlayer(player))
}} player={player} winner={winner} returnCell={returnCell} />
</GameLayout>


{showModal && winner !== 0 && (
<div className="modalOverlay">
<div className="modal">
<h2>Победил {winner === 1 ? 'Игрок 1' : 'Бот'}!</h2>
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