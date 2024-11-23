import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "../../Episodes/EpisodeDetails/EpisodeDetails.module.scss";
import CharBox from "../../Characters/CharBox/CharBox";
import Loading from "../../Loading";

const LocationDetails = () => {
  const [location, setLocation] = useState(null);
  const [characters, setCharacters] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/location/${id}`);
        const locationJson = await res.json();
        setLocation(locationJson);
        console.log(locationJson);

        const fetchedCharacters = await Promise.all(
          locationJson.residents.map((url) =>
            fetch(url).then((res) => res.json())
          )
        );

        console.log(fetchedCharacters)
        setCharacters(fetchedCharacters);
      } catch (e) {
        console.error("Ошибка при загрузке данных:", e);
      }
    };

    getData();
  }, [id]);

  if (!location) {
    return <Loading/>;
  }

  return (
    <div className='cont'>
      <h1 className={s.episode__name}>{location.name}</h1>
      <div className={s.episode__info_cont}>
        <div className={s.episode__info}>
          <div>Type</div>
          <span>{location.type}</span>
        </div>
        <span className={s.episode__date}>
          <div>Dimension
          </div>
          <span>{location.dimension}</span></span>
      </div>
      <div className={s.char__subtitle}>Residents</div>
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

export default LocationDetails;
