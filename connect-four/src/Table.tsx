import { useState, useEffect } from 'react'
import styles from './Table.module.css'

interface TableProps {
  table: number[][]
  makeMove: (col: number, pl: number) => void
  player: number
  winner: number
  returnCell: (col:number) => number
}

function Table({ table, makeMove, player, winner,returnCell}: TableProps) {
  const [hoveredCol,setHoveredCol]=useState<number | null>(null)
  const [hoveredCell,setHoveredCell]=useState<number | null>(null)

  
  return (
    <div className={styles.table_container}>
      
      <table className={styles.table}>
         
        <tbody>
          {table.map((row,i)=>(
            <tr key={i}>
              {row.map((cell,j)=>{
                const classNames = [styles.cell];

              if (cell === 0) {
                if (hoveredCol === j && returnCell(j) >= 0 && winner === 0) {
                  classNames.push(styles.hovered);
                  if (returnCell(j) === i){ 
                    classNames.push(styles.hoveredCell);
                    classNames.push(player === 1 ? styles.player1 : styles.player2);}

                }
              } else {
                classNames.push(cell === 1 ? styles.player1 : styles.player2);
              }

              return (
                <td className={classNames.join(' ')}
                onMouseEnter={() => setHoveredCol(j)}
              onMouseLeave={() => {setHoveredCol(null)}}
              onClick={() => {if (returnCell(j)<0|| winner !== 0) return; 
              makeMove(j, player);}}/>
              )})}

            </tr>
          ))
        
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table
