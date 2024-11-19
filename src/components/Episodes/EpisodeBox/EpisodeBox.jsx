import { Link } from "react-router-dom"
import s from "./EpisodeBox.module.scss"

const EpisodeBox = ({ name, episode, date, id}) => {
  return (
    <div key={id} className={s.episodeBox}>
      <p className={s.title}>{name}</p>
      <p className={s.episode}> {episode}</p>
      <p className={s.date}>{date}</p>
      </div>
  )
}

export default EpisodeBox;