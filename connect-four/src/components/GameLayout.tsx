import React from 'react'
import style from './style/Game.module.css'


interface GameLayoutProps {
player: number
points1: number
points2: number
winner: number
restart: () => void
modeLabel?: string
children?: React.ReactNode,
timer:number
isTimer:boolean
}


export default function GameLayout({
player,
points1,
points2,
winner,
restart,
modeLabel = 'Игрок 2',
children,
timer,
isTimer
}: GameLayoutProps) {
return (
<div className={style.game}>
<header className={style.header}>
<div />
<div className={style.names}>
    {player==1&&isTimer&&(
    <span>{timer}</span>
    )
}
<div
className={`${style.indicator} ${style.player1} ${player === 1 && winner === 0 ? style.active : ''}`}
/>
<span className={player === 1 ? style.activeName : ''}>Игрок 1</span>
<span>{points1}</span>
<span>vs</span>
<span>{points2}</span>
<span className={player === 2 ? style.activeName : ''}>{modeLabel}</span>
<div
className={`${style.indicator} ${style.player2} ${player === 2 && winner === 0 ? style.active : ''}`}
/>
{player==2&&isTimer&&(
    <span>{timer}</span>
    )
}
</div>


<button className={style.restartBtn} onClick={restart}>
Restart
</button>
</header>


<div className={style.center}>{children}</div>
</div>
)
}