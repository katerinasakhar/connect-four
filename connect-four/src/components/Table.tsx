import { useState, useEffect } from 'react'
import styles from './style/Table.module.css'

interface TableProps {
  table: number[][]
  makeMove: (col: number, pl: number) => void
  player: number
  winner: number
  winCells:[number, number][]
  returnCell: (col:number) => number

}

function Table({ table, makeMove, player, winner,winCells,returnCell}: TableProps) {
  const [hoveredCol,setHoveredCol]=useState<number | null>(null)
  const [hoveredCell,setHoveredCell]=useState<number | null>(null)

  
  return (
    <div className={styles.table_container}>
      
      <table className={styles.table}>
         
        <tbody>
          {table.map((row,i)=>(
            <tr key={i}>
               {row.map((cell: number, j: number) => {
    const classNames: string[] = [styles.cell];
    let cellContent: React.ReactNode = null; // содержимое ячейки (звезда)

    if (cell === 0) {
      // Подсветка при наведении
      if (hoveredCol === j && returnCell(j) >= 0 && winner === 0) {
        classNames.push(styles.hovered);
        if (returnCell(j) === i) {
          classNames.push(styles.hoveredCell);
          classNames.push(player === 1 ? styles.player1 : styles.player2);
        }
      }
    } else {
      // Клетка занята игроком
      classNames.push(cell === 1 ? styles.player1 : styles.player2);

      // Проверяем, является ли эта клетка выигрышной
      if (winCells.some(([x, y]: [number, number]) => x === i && y === j)) {
        classNames.push(styles.winCell);
        cellContent =' \u2605';
      }
    }

              return (
                <td className={classNames.join(' ')}
                onMouseEnter={() => setHoveredCol(j)}
              onMouseLeave={() => {setHoveredCol(null)}}
              onClick={() => {if (returnCell(j)<0|| winner !== 0) return; 
              makeMove(j, player);}}>{cellContent}</td>
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
