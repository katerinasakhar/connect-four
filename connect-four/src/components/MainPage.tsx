import { NavLink } from 'react-router-dom';
import styles from './style/MainPage.module.css'
import { useState } from 'react';
import './style/Modal.css'
import './style/Settings.css'


function MainPage() {
  const [showModal,setShowModal]=useState(false)
  const [isTimer, setIsTimer]=useState(false)
  const [timer, setTimer]=useState(1)
  const handleIsTimer = (e:any) =>{
    setIsTimer(e.target.checked)
  }
  const handleTimer = (e:any) =>{
    setTimer(Math.abs(Number(e.target.value)))
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выберите режим игры</h1>
      <div className={styles.modeBlock}>
        <div className={styles.mode}>
          <NavLink to="/human-and-human" state={{ isTimer, timer }} className={styles.link}>
            Играть с другом
          </NavLink>
          <button onClick={()=>setShowModal(true)} className={styles.settings}>Настройки</button>
        </div>

        <div className={styles.mode}>
          <NavLink to="/bot-and-human" className={styles.link}>
            Играть с ботом
          </NavLink>
        </div>
      </div>
      {showModal&&(
        <div className="modalOverlay">
<div className="modal">
   <div className="setting-row">
        <span>Играть с таймером</span>

        {/* Переключатель */}
        <label className="switch">
          <input type="checkbox" checked={isTimer} onChange={handleIsTimer} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="setting-row">
        <span>Время (секунды)</span>
        <input
          type="number"
          value={timer}
          onChange={handleTimer}
          disabled={!isTimer}
          className="number-input"
          min={1}
        />
      </div>

      <div className="buttons">
        <button className="apply" onClick={() => setShowModal(false)}>
          Применить
        </button>
        <button
          className="cancel"
          onClick={() => {
            setIsTimer(false);
            setTimer(0);
            setShowModal(false);
          }}
        >
          Отменить
        </button>
</div>
</div>
</div>
)
      }
    </div>
  );
}

export default MainPage;
