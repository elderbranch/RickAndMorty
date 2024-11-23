import { Link } from 'react-router-dom'
import styles from './CharDetailce.module.scss'

const Episode = ({ name, episode, air_date, id }) => {
  return (
    <Link to={`/episode/${id}`}>
      <li  key={id}>
        <div>
          <strong>{episode}</strong> <br />
          <span className={styles.episode__name}>{name}</span> <br />
          <span>{air_date}</span>
        </div>
        <div className={styles.img}></div>
      </li>
    </Link>
  )
}

export default Episode