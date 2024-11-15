import { useEffect, useState } from 'react';
import './App.css';
import SkeletonCardItem from './components/Skeleton/SkeletonCardItem';

function App() {
  const [data, setData] = useState([]);
  const [curnPage, setCurnPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState('');
  const [aliveStatus, setAliveStatus]= useState('')

  const visibleItems = 12;

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: curnPage,
        ...(genderFilter && { gender: genderFilter }),
        ...(aliveStatus && { status: aliveStatus }),
      });

      console.log(queryParams.toString())
      let response = '';
      try {
        response = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams}`);
        const responseJson = await response.json();
        setData(responseJson.results || []);
      } catch (error) {
        throw new Error('Something went wrong')
      } finally {
        if (response.ok) {
          setIsLoading(false);
        } else {
          console.error('Response was not successful or undefined');
        }
      }
    };

    getData();
  }, [curnPage, genderFilter, aliveStatus]);

  return (
    <>
      <div className='Nav_block'>
        <button onClick={() => setCurnPage(page => Math.max(1, page - 1))}>Загрузить предыдущую страницу</button>
        <p>Страница номер {curnPage}</p>
        <button onClick={() => setCurnPage(page => Math.min(42, page + 1))}>Загрузить новую страницу</button>
      </div>
      <div className="filter">
        <label>Фильтровать по полу:</label>
        <select onChange={e => setGenderFilter(e.target.value)} value={genderFilter}>
          <option value="">Все</option>
          <option value="Male">Мужской</option>
          <option value="Female">Женский</option>
          <option value="Genderless">Без пола</option>
          <option value="unknown">Неизвестно</option>
        </select>
      </div>
      <div className="filter">
        <label>Фильтровать по статусу:</label>
        <select onChange={e => setAliveStatus(e.target.value)} value={aliveStatus}>
          <option value="">Все</option>
          <option value="Alive">Жив</option>
          <option value="Dead">Мертв</option>
          <option value="unknown">Неизвестно</option>
        </select>
      </div>
      <div className="grid">
        {isLoading ? (
          Array.from({ length: visibleItems }).map((_, index) => (
            <SkeletonCardItem key={index} />
          ))
        ) : (
          data.map((item, index) => (
            <div key={index} className='chara_box'>
              <img src={item.image} alt={item.name} />
              <div className='chara_info'>
                <div className={item.status}></div>
                <h1>Name: {item.name}</h1>
                <h1>Status: {item.status} </h1>
                <h2>Gender: {item.gender}</h2>
                <h3>Origin location:  {item.origin.name}</h3>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
