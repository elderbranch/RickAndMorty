import { useParams } from 'react-router-dom';
import { useChar } from '../../Context/CharContext';

import styles from './CharDetailce.module.css'

const ChartDetails = () => {
  const { id } = useParams();
  const CharList = useChar();
  const char = CharList.data.filter((char) => char.id == id)[0];
  console.log(CharList);
  console.log(char);

  if (!char) {
    return <p>Персонаж не найден</p>;
  }

  return (
    <div className={styles.cont}>
      <div className={styles.img__cont}><img src={char.image} /></div>
      <h1 className={styles.title}>{char.name}</h1>
      <div className={styles.info__cont}>
        <div className={styles.charInfo__cont}>
          <h2>Information</h2>
          <ul className={styles.info__cont_list}>
            <li>
              Gender <br/>
              <span>{char.gender}</span>
            </li>
            <li>
              Status <br/>
              <span>{char.status}</span>
            </li>
            <li>
              Specie <br/>
              <span>{char.species}</span>
            </li>
            <li>
              Origin <br/>
              <span>{char.origin.name}</span>
            </li>
            <li>
              Type <br/>
              <span>{char.type ? char.type : 'Unknown'}</span>
            </li>
            <li>
              Location <br/>
              <span>{char.location.name}</span>
            </li>
          </ul>
        </div>
        <div className={styles.episodes__cont}>
          <h2>Episodes</h2>
          <div className={styles.episodes__cont_list}>
            {/* {char.episode} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDetails;