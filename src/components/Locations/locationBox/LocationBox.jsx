import { Link } from "react-router-dom"
import s from "../../Episodes/EpisodeBox/EpisodeBox.module.scss"
import Loading from "../../Loading";

const LocationBox = ({ name, episode, date, id }) => {
  if (!id) {
    return <Loading/>;
  }
  return (
    <Link to={`/location/${id}`} className={s.a}> 
      <div key={id} className={s.episodeBox}>
        <p className={s.title}>{name}</p>
        <p className={s.episode}> {episode}</p>
        <p className={s.date}>{date}</p>
      </div>
    </Link>
  )
}

export default LocationBox;