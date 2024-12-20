import { Link } from "react-router-dom"
import s from "./EpisodeBox.module.scss"
import Loading from "../../Loading";

const EpisodeBox = ({ name, episode, date, id }) => {
  if (!id) {
    return <Loading/>;
  }
  return (
    <Link to={`/episode/${id}`} className={s.a}> 
      <div key={id} className={s.episodeBox}>
        <p className={s.title}>{name}</p>
        <p className={s.episode}> {episode}</p>
        <p className={s.date}>{date}</p>
      </div>
    </Link>
  )
}

export default EpisodeBox;