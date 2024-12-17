import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./CharBox.module.css";
import Loading from "../../Loading";
import Error404 from "../../Error404";

const CharBox = ({ name, status, image, species, id }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  if (!name) {
    return <Error404 />;
  }

  return (
    <Link to={`/character/${id}`} className={s.a}>
      <div key={id} className={s.chara_box}>
        {!isImageLoaded && <Loading />} 
        <img
          src={image}
          alt={name}
          style={{ display: isImageLoaded ? "block" : "none" }}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className={s.chara_info}>
          <h1 className={s.name}>{name}</h1>
          <span className={s.status_info}>
            <span className={status}></span>
            {status} - {species}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CharBox;
