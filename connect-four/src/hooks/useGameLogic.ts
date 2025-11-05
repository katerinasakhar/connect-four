import {useState, useEffect} from 'react'
import { checkWin } from '../utils/checkWin'

const ROWS = 6
const COLUMN = 7
export type Player =1 | 2
export interface UseLogicResult{
    table: number[][]
    player: number
    winner: number
    count: number
    points1: number
    points2: number
    place: [number, number]
    makeMove: (col: number, pl: number) => void
    restart: () => void
    returnCell: (col: number) => number
    changePlayer: (pl: number) => number
    setPlayer: React.Dispatch<React.SetStateAction<number>>
    setWinner: React.Dispatch<React.SetStateAction<number>>
}

export function useGameLogic(): UseLogicResult{
    const [table, setTable] = useState(Array(6).fill(null).map(() => Array(7).fill(0)))
    const [player, setPlayer]=useState(2)
    const [winner, setWinner]=useState(0)
    const [place,setPlace]=useState<[number, number]>([0, 0])
    const [count,setCount]=useState(0)
    const [points1,setPoints1]=useState(0)
    const [points2,setPoints2]=useState(0)
    const [showModal, setShowModal] = useState(false);

    function changePlayer(pl:number){
    return pl===1 ? 2 : 1
    }

  function returnCell(col:number){
    for (let row = 5; row >= 0; row--) {
        if (table[row][col] === 0) return row
    }
    return -1
  }
  function setCell(row:number,col:number, num:number){
    const newTable=table.map(r => [...r])
    newTable[row][col]=num
    setTable(newTable)
    setPlace([row,col])
    setCount(count+1)
  }
   function makeMove(col:number, pl:number){
    let row = returnCell(col)
    setCell(row,col,pl)
    setPlayer(changePlayer(pl))
  }
  function restart(){
    setTable(Array(6).fill(null).map(() => Array(7).fill(0)))
    setPlayer(1)
    setWinner(0)
    setCount(0)
  }
  function updatePoints(pl: number) {
if (pl === 1) setPoints1((p) => p + 1)
else setPoints2((p) => p + 1)
}


useEffect(() => {
const [row, col] = place
if (row == null || col == null) return
if (table[row][col] === 0) return


const win = checkWin(table, row, col)
if (win !== 0) {
setWinner(win)
updatePoints(win)
}
}, [place])
  return {
table,
player,
winner,
count,
points1,
points2,
place,

makeMove,
restart,
returnCell,
changePlayer,
setPlayer,
setWinner
}
}