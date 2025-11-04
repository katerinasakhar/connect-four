export const ROWS=6
export const COLUMNS=7

export function checkWin(table:number[][],row:number,col:number):number{
    const pl=table[row][col]
    if (!pl) return 0
     for (let i=5; i>=3;i--){
      if (table[i][col]===table[i-1][col]&&
        table[i-1][col]===table[i-2][col]&&
        table[i-2][col]===table[i-3][col]&&
      table[i][col]!==0){
        return pl
      }
    }
    for (let i=6; i>=3;i--){
      if (table[row][i]===table[row][i-1]&&
        table[row][i-1]===table[row][i-2]&&
        table[row][i-2]===table[row][i-3]&&
      table[row][i]!==0){
        return pl
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
        return pl
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
        return pl
      }
      r++
      c--
    }
    return 0
}