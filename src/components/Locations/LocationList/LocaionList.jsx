import Logo from "../../../assets/404.webp"
import { Pagination } from 'antd';
import FilterByInput from '../../FilterCharacters/FilterByInput';
import s from './LocationList.module.css'
import LocationBox from "../locationBox/LocationBox";
import { useEffect, useState } from "react";
import { instance } from "../../../services/ApiServices";
import { useSearchParams } from "react-router-dom";
import Loading from "../../Loading";
import Error404 from "../../Error404";

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [totalPages, setTotalPage] = useState(42);
  const [searchParams, setSearchParams] = useSearchParams('');
  const [queryParams, setQueryParams] = useState({
    page: '',
    name: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false)

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...queryParams, ...newFilters };
    setQueryParams(updatedFilters);

    const filteredFilters = Object.fromEntries(
      Object.entries(updatedFilters).filter(([_, value]) => value)
    );

    const newSearchParams = new URLSearchParams(filteredFilters);
    setSearchParams(newSearchParams, { replace: true });
  }

  useEffect(() => {
    const newQueryParams = {};
    searchParams.forEach((value, key) => {
      newQueryParams[key] = value || '';
    });
    setQueryParams((prev) => ({ ...prev, ...newQueryParams }));
  }, [searchParams]);

  useEffect(() => {
    const getData = async () => {
      setError(false)
      setIsLoading(true);
      try {
        const response = await instance.get(`/location`, { params: queryParams });
        setLocations(response.data.results || []);
        setTotalPage(response.data.info.pages || 1);
        console.log(response);
      } catch (error) {
        console.error('Error:', error.message);
        setError(true)
        setLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [queryParams]);

  return (
    <div className="cont">
      <div className={s.cont__logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <FilterByInput setFuction={updateFilters} value={queryParams.name} placeholder='Filter by name' />
      {isLoading ? <Loading /> : (<div className="grid">
        {locations.map((item) => (
          <LocationBox
            id={item.id}
            name={item.name}
            episode={item.type}
            date={item.dimension}
            key={item.id}
          />
        ))}
      </div>)}
      {error && <Error404 />}
      <Pagination onChange={(value) => updateFilters({ page: value })} current={queryParams.page} total={totalPages * 10} className="pagination" showSizeChanger={false} />
    </div>
  )
}

export default LocationList;