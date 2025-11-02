import { useState, useEffect } from 'react'
import styles from './Table.module.css'

interface TableProps {
  table: number[][]
  makeMove: (col: number, pl: number) => void
  player: number
  winner: number
  count: number
}

function Table({ table, makeMove, player, winner, count }: TableProps) {
  const [hoveredCol,setHoveredCol]=useState<number | null>(null)

  
  return (
    <div className={styles.table_container}>
      
      <table className={styles.table}>
         
        <tbody>
          {table.map((row,i)=>(
            <tr key={i}>
              {row.map((cell,j)=>(
                <td className={`${styles.cell} ${cell===0 ? hoveredCol===j&&table[0][j] === 0 && winner === 0 ?  `${styles.hovered}` :  "" : cell===1 ? `${styles.player1}` : `${styles.player2}`}`}
                onMouseEnter={() => setHoveredCol(j)}
              onMouseLeave={() => setHoveredCol(null)}
              onClick={() => {if (table[0][j] !== 0 || winner !== 0) return; 
              makeMove(j, player);}}/>
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
