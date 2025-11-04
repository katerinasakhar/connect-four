import { useState, useEffect } from 'react'
import Table from './Table'
import tableStyle from './Table.module.css'
import style from './Game.module.css'
import "./Modal.css"

const HUMAN = 1
const BOT = 2 

function Bot(){
    const [table, setTable] = useState(Array(6).fill(null).map(() => Array(7).fill(0)))
    const [player, setPlayer]=useState(2)
    const [winner, setWinner]=useState(0)
    const [place,setPlace]=useState([0,0])
    const [count,setCount]=useState(0)
    const [points1,setPoints1]=useState(0)
    const [points2,setPoints2]=useState(0)
    const [showModal, setShowModal] = useState(false);

    

    function botMove(){
        //Проверяем, может ли бот победить
        for (let col=0;col<7;col++){
            const row=returnCell(col)
            if (row===-1) continue
            const tempTable = table.map(r => [...r])
        tempTable[row][col] = BOT
        if (checkPotentialWin(tempTable, row, col)) {
            makeMove(col, BOT)
            return
        }
        }
        //Проверяем, может ли человек победить
        for (let col = 0; col < 7; col++) {
            const row = returnCell(col)
            if (row === -1) continue

            const tempTable = table.map(r => [...r])
            tempTable[row][col] = HUMAN
            if (checkPotentialWin(tempTable, row, col)) {
                makeMove(col, BOT) // Блокируем
                return
            }
        }
        //Случайный ход
        const available = []
        for (let col = 0; col < 7; col++) {
            if (returnCell(col) !== -1) available.push(col)
        }
        if (available.length > 0) {
            const randomCol = available[Math.floor(Math.random() * available.length)]
            makeMove(randomCol, BOT)
        }
    }
    function checkPotentialWin(tempTable: number[][], row: number, col: number): boolean {
        const pl = tempTable[row][col]

        // Проверка вертикали
        let count = 1
        for (let i = row + 1; i < 6 && tempTable[i][col] === pl; i++) count++
        for (let i = row - 1; i >= 0 && tempTable[i][col] === pl; i--) count++
        if (count >= 4) return true

        // Проверка горизонтали
        count = 1
        for (let i = col + 1; i < 7 && tempTable[row][i] === pl; i++) count++
        for (let i = col - 1; i >= 0 && tempTable[row][i] === pl; i--) count++
        if (count >= 4) return true

        // Диагональ ↘
        count = 1
        for (let i = 1; row + i < 6 && col + i < 7 && tempTable[row + i][col + i] === pl; i++) count++
        for (let i = 1; row - i >= 0 && col - i >= 0 && tempTable[row - i][col - i] === pl; i++) count++
        if (count >= 4) return true

        // Диагональ ↙
        count = 1
        for (let i = 1; row + i < 6 && col - i >= 0 && tempTable[row + i][col - i] === pl; i++) count++
        for (let i = 1; row - i >= 0 && col + i < 7 && tempTable[row - i][col + i] === pl; i++) count++
        if (count >= 4) return true

        return false
}
    function changePlayer(pl:number){
    return pl===1 ? 2 : 1
  }

  function returnCell(col:number){
    for (let row = 5; row >= 0; row--) {
        if (table[row][col] === 0) return row
    }
    return -1
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

    function setCell(row:number,col:number, num:number){
    const newTable=table.map(r => [...r])
    newTable[row][col]=num
    setTable(newTable)
    setPlace([row,col])
    setCount(count+1)
  }
    function checkWin(){
    const [row,col]=place
    for (let i=5; i>=3;i--){
      if (table[i][col]===table[i-1][col]&&
        table[i-1][col]===table[i-2][col]&&
        table[i-2][col]===table[i-3][col]&&
      table[i][col]!==0){
        setWinner(table[row][col])
        if (table[row][col]===1){
          setPoints1(points1+1)
        }
        else{
          setPoints2(points2+1)
        }
        return
      }
    }
    for (let i=6; i>=3;i--){
      if (table[row][i]===table[row][i-1]&&
        table[row][i-1]===table[row][i-2]&&
        table[row][i-2]===table[row][i-3]&&
      table[row][i]!==0){
        setWinner(table[row][col])
        if (table[row][col]===1){
          setPoints1(points1+1)
        }
        else{
          setPoints2(points2+1)
        }
        return
      }
    }
    let r=row
    let c=col
    while (r+1<6&&c+1<7){
      r++
      c++
    }
   
    while(r-3>=0&&c-3>=0){
      if (table[r][c]===table[r-1][c-1]&&
        table[r-1][c-1]===table[r-2][c-2]&&
        table[r-2][c-2]===table[r-3][c-3]&&
        table[r][c]!==0){
        setWinner(table[r][c])
        if (table[r][c]===1){
          setPoints1(points1+1)
        }
        else{
          setPoints2(points2+1)
        }
        return
      }
      r--
      c--

    }
    r=row
    c=col
    while (r-1>=0&&c+1<7){
      r--
      c++
    }
   
    while(r+3<6&&c-3>=0){
      if (table[r][c]===table[r+1][c-1]&&
        table[r+1][c-1]==table[r+2][c-2]&&
        table[r+2][c-2]==table[r+3][c-3]&&
        table[r][c]!==0){
        setWinner(table[r][c])
        if (table[r][c]===1){
          setPoints1(points1+1)
        }
        else{
          setPoints2(points2+1)
        }
        return
      }
      r++
      c--
    }
      }
    
  useEffect(()=>{
    checkWin()
  },[place,table])
  useEffect(() => {
  if (winner === 0 && player === BOT) {
    const timer = setTimeout(() => botMove(), 300)
    return () => clearTimeout(timer)
  }
}, [player, winner])
  useEffect(() => {
    if (winner !== 0) {
        const timer = setTimeout(() => setShowModal(true), 1500);
        return () => clearTimeout(timer);
    }
    }, [winner]);
  return(
    <div className={style.game}>
         <header className={style.header}>
         <div/>
          <div className={style.names}>
          
            <div
          className={`${style.indicator} ${style.player1} ${
            player === 1 && winner === 0 ? style.active : ''
          }`}
        />
              <span className={player === 1 ? style.activeName : ''}>Игрок 1</span>
              <span>{points1}</span>
              <span>vs</span>
              <span>{points2}</span>
              <span className={player === 2 ? style.activeName : ''}>Игрок 2</span>
               <div
          className={`${style.indicator} ${style.player2} ${
            player === 2 && winner === 0 ? style.active : ''
          }`}
        />
        </div>
        
        <button className={style.restartBtn} onClick={restart}>
          Restart
        </button>
      </header>
    <div className={style.center}>
      <Table
        table={table}
        makeMove={makeMove}
        player={player}
        winner={winner}
        returnCell={returnCell}
      />
      </div>
        {showModal && winner !== 0 && (
    <div className="modalOverlay">
        <div className="modal">
        <h2>Победил игрок {winner}!</h2>
        <button onClick={restart}>Играть снова</button>
        </div>
    </div>
    )}

    {!showModal && count === 42 && (
    <div className="modalOverlay">
        <div className="modal">
        <h2>Ничья</h2>
        <button onClick={restart}>Играть снова</button>
        </div>
    </div>
    )}

    </div>
  )
}
export default Bot