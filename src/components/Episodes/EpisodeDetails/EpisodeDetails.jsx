import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./EpisodeDetails.module.scss";
import CharBox from "../../Characters/CharBox/CharBox";
import Loading from "../../Loading";
import { instance } from "../../../services/ApiServices";

const EpisodeDetails = () => {
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get(`/episode/${id}`);
        setEpisode(res.data);
        const fetchedCharacters = await Promise.all(
          res.data.characters.map((url) =>
            fetch(url).then((res) => res.json())
          )
        );
        setCharacters(fetchedCharacters);
      } catch (e) {
        console.error("Ошибка при загрузке данных:", e);
      }
    };

    getData();
  }, [id]);

  if (!episode) {
    return <Loading/>;
  }

  return (
    <div className='cont'>
      <h1 className={s.episode__name}>{episode.name}</h1>
      <div className={s.episode__info_cont}>
        <div className={s.episode__info}>
          <div>Episode</div>
          <span>{episode.episode}</span>
        </div>
        <span className={s.episode__date}>
          <div>Episode</div>
          <span>{episode.air_date}</span></span>
      </div>
      <div className={s.char__subtitle}>Cast</div>
      <div className="grid">
        {characters.map((item) => (
          <CharBox
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            status={item.status}
            species={item.species}
          />
        ))}
      </div>
    </div>
  );
};

export default EpisodeDetails;
