import { useState, useEffect } from 'react'
import Table from './Table'
import tableStyle from './Table.module.css'
import style from './Game.module.css'


function Game(){
    const [table, setTable] = useState(Array(6).fill(null).map(() => Array(7).fill(0)))
    const [player, setPlayer]=useState(2)
    const [winner, setWinner]=useState(0)
    const [place,setPlace]=useState([0,0])
    const [count,setCount]=useState(0)
      function changePlayer(pl:number){
    return pl===1 ? 2 : 1
  }
    function makeMove(col:number, pl:number){
    let row = 5
    while(table[row][col]!==0){
      row--
    }
    setCell(row,col,pl)
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
        return
      }
    }
    for (let i=6; i>=3;i--){
      if (table[row][i]===table[row][i-1]&&
        table[row][i-1]===table[row][i-2]&&
        table[row][i-2]===table[row][i-3]&&
      table[row][i]!==0){
        setWinner(table[row][col])
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
        return
      }
      r++
      c--
    }
      }
    
  useEffect(()=>{
    checkWin()
    setPlayer(changePlayer(player))
  },[place])
  return(
    <div className={style.game}>
         <header className={style.header}>
         <div/>
          <div className={style.names}>
          {winner === 0 ? (
            <>
            <div
          className={`${style.indicator} ${style.player1} ${
            player === 1 && winner === 0 ? style.active : ''
          }`}
        />
              <span className={player === 1 ? style.activeName : ''}>Игрок 1</span>
              <span>vs</span>
              <span className={player === 2 ? style.activeName : ''}>Игрок 2</span>
               <div
          className={`${style.indicator} ${style.player2} ${
            player === 2 && winner === 0 ? style.active : ''
          }`}
        />
            </>
          ) : (
            <span className={style.winnerText}>Победитель: Игрок {winner}</span>
          )}
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
        count={count}
      />
      </div>
    </div>
  )
}
export default Game