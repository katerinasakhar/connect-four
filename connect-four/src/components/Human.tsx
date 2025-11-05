import React, { useState, useEffect } from 'react'
import GameLayout from './GameLayout'
import Table from './Table'
import { useGameLogic } from '../hooks/useGameLogic'
import "./style/Modal.css"
import { useLocation } from 'react-router-dom';


export default function Human() {
    const location = useLocation();
  const { isTimer, timer } = location.state || { isTimer: false, timer: 0 };

const {
table,
player,
winner,
count,
points1,
points2,
winCells,
makeMove,
restart,
returnCell,
changePlayer,
setPlayer
} = useGameLogic()


const [showModal, setShowModal] = useState(false)
const [message,setMessage]=useState("")
const [time,setTime]=useState(timer)

useEffect(() => {
if (winner !== 0) {
const timer1 = setTimeout(() => setShowModal(true), 500)
return () => clearTimeout(timer1)
}
}, [winner])
useEffect(() => {
  if (isTimer){
  let interval: any;
  
interval = setInterval(() => {
    setTime((t:number) => {
    if (t <= 1) {
        clearInterval(interval);
        setMessage("Время вышло!");
        setPlayer(changePlayer(player));
        return timer; 
    }
    return t - 1;
    });
}, 1000);
  return () => clearInterval(interval);
}
}, [player]);

return (
<>
<GameLayout player={player} points1={points1} points2={points2} winner={winner} restart={restart} modeLabel="Игрок 2" timer={time} isTimer={isTimer}>
<Table table={table} makeMove={(col: number) => {
makeMove(col, player)
setPlayer(changePlayer(player))
}} player={player} winner={winner} returnCell={returnCell} winCells={winCells}/>
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