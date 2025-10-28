import { useState, useEffect } from 'react'
import styles from './Table.module.css'


function Table() {
  const [table, setTable]=useState(Array(7).fill(null).map(()=>(Array(6).fill(0))))
  const [player, setPlayer]=useState(1)

  function changePlayer(pl:number){
    return pl===1 ? 2 : 1
  }
  function makeMove(col:number, pl:number){
    let row = 6
    while(table[row][col]!==0){
      row--
    }
    setCell(row,col,pl)
    setPlayer(changePlayer(pl))
  }

  function setCell(row:number,col:number, num:number){
    const newTable=table.map(r => [...r])
    newTable[row][col]=num
    setTable(newTable)
  }
  
  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <th><button onClick={()=>makeMove(0,player)} disabled={table[0][0]!==0}>1</button></th>
          <th><button onClick={()=>makeMove(1,player)} disabled={table[0][1]!==0}>2</button></th>
          <th><button onClick={()=>makeMove(2,player)} disabled={table[0][2]!==0}>3</button></th>
          <th><button onClick={()=>makeMove(3,player)} disabled={table[0][3]!==0}>4</button></th>
          <th><button onClick={()=>makeMove(4,player)} disabled={table[0][4]!==0}>5</button></th>
          <th><button onClick={()=>makeMove(5,player)} disabled={table[0][5]!==0}>6</button></th>
        </thead>
        <tbody>
          {table.map((row,i)=>(
            <tr key={i}>
              {row.map((cell)=>(
                <td className= {cell==0 ? styles.cell : cell==1 ? `${styles.cell} ${styles.player1}` : `${styles.cell} ${styles.player2}`}/>
              ))}

            </tr>
          ))
        
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
