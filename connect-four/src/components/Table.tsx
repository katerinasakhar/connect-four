import { useState} from 'react'
import styles from './style/Table.module.css'

interface TableProps {
  table: number[][]
  makeMove: (col: number, pl: number) => void
  player: number
  winner: number
  winCells:[number, number][]
  isBot:boolean
  returnCell: (col:number) => number

}

function Table({ table, makeMove, player, winner,winCells,isBot,returnCell}: TableProps) {
  const [hoveredCol,setHoveredCol]=useState<number | null>(null)

  
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
      // подсветка при наведении
      if (hoveredCol === j && returnCell(j) >= 0 && winner === 0&&((player === 2 && !isBot) || player === 1)) {
        
        classNames.push(styles.hovered);
        if (returnCell(j) === i) {
          classNames.push(styles.hoveredCell);
          classNames.push(player === 1 ? styles.player1 : styles.player2);
        }
      
      }
    } else {
      // клетка занята игроком
      classNames.push(cell === 1 ? styles.player1 : styles.player2);

      // проверяем, является ли эта клетка выигрышной
      if (winCells.some(([x, y]: [number, number]) => x === i && y === j)) {
        classNames.push(styles.winCell);
        cellContent =' \u2605';
      }
    }

              return (
                <td className={classNames.join(' ')}
                onMouseEnter={() => {if ((player==2&&!isBot)||(player==1)) setHoveredCol(j)}}
              onMouseLeave={() => {setHoveredCol(null)}}
              onClick={() => {if (returnCell(j)<0|| winner !== 0||(player==2&&isBot)) return; 
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
