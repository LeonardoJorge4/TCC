import styles from './styles.module.scss';

import { FiCalendar } from "react-icons/fi";

export default function Post() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.banner}>
          <img src="/images/banner.png" alt="Banner" />
        </div>
        <div className={styles.containerReadingPost}>
          <div className={styles.titleWithInfos}>
            <h2>Mapas com React usando Leaflet</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
            <div className={styles.author}>
              <span><FiCalendar className={styles.calendarIcon}/> 09/10/2000</span>
              <span>por <b>Leonardo Jorge</b></span>
              <span>4 min</span>
            </div>
          </div>
          <div className={styles.readingPost}></div>
        </div>
      </div>
    </div>
  )
}
