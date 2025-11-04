import { NavLink } from 'react-router-dom';
import styles from './style/MainPage.module.css'

function MainPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Выберите режим игры</h1>
      <div className={styles.modeBlock}>
        <div className={styles.mode}>
          <NavLink to="/human-and-human" className={styles.link}>
            Играть с другом
          </NavLink>
        </div>

        <div className={styles.mode}>
          <NavLink to="/bot-and-human" className={styles.link}>
            Играть с ботом
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
