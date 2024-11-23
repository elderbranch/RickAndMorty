import { Link } from "react-router-dom"
import s from "./CharBox.module.css"
import Loading from "../../Loading";

const CharBox = ({name, status, image, species, id}) => {
  if (!id) {
    return <Loading/>;
  }
  return (
    <Link to={`/character/${id}`}>
      <div key={id} className={s.chara_box}>
        <img src={image} alt={name} />
        <div className={s.chara_info}>
          <h1 className={s.name}>{name}</h1>
          <span className={s.status_info}>
            <span className={status}></span>
            {status} - {species}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default CharBox