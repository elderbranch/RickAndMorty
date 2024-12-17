import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import styles from './CharDetailce.module.scss'
import Episode from './Episode';
import { instance } from '../../../services/ApiServices';
import BtnBack from '../../UI/GoBackBtn';
import LoadingBig from '../../LoadingBig';

const CharDetails = () => {
  const [char, setChar] = useState();
  const [episodes, setEpisodes] = useState([]);
  const [location, setLocation] = useState();

  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await instance.get(`/character/${id}`);
        setChar(res.data);
        console.log(res);
        const [episodesData, locationData] = await Promise.all([
          Promise.all(res.data.episode.map((url) => fetch(url).then((res) => res.json()))),
          fetch(res.data.location.url).then((res) => res.json()),
        ]);

        setEpisodes(episodesData);
        setLocation(locationData);
        console.log(location)
      } catch (e) {
        throw new Error("smth go wrong");
      }
    }
    getData();
  }, [id])

  if (!char) {
    return <LoadingBig />;
  }

  return (
    <div className={styles.cont}>
        <BtnBack />
      <div className={styles.img__cont}><img src={char.image} /></div>
      <h1 className={styles.title}>{char.name}</h1>
      <div className={styles.info__cont}>
        <div className={styles.charInfo__cont}>
          <h2>Information</h2>
          <ul className={styles.info__cont_list}>
            <li>
              Gender <br />
              <span>{char.gender}</span>
            </li>
            <li>
              Status <br />
              <span>{char.status}</span>
            </li>
            <li>
              Specie <br />
              <span>{char.species}</span>
            </li>
            <li>
              Origin <br />
              <span>{char.origin.name}</span>
            </li>
            <li>
              Type <br />
              <span>{char.type ? char.type : 'Unknown'}</span>
            </li>
            <Link to={location ? `/location/${location.id}` : null} style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <li >
                Location <br />
                <span>{char.location.name}</span>
              </li>
              <div className={styles.img}></div>
            </Link>
          </ul>
        </div>
        <ul className={styles.episodes__cont}>
          <h2>Episodes</h2>
          <div className={styles.episodes__cont_list}>
            {episodes.map((item) => (
              <Episode
                key={item.id}
                name={item.name}
                id={item.id}
                episode={item.episode}
                air_date={item.air_date}
              />
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default CharDetails;