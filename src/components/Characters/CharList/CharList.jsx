import "./CharList.css";
import FilterCharacters from "../../FilterCharacters/FilterCharacters";
import CharBox from "../CharBox/CharBox";
import Logo from "../../../assets/Logo.png";
import Error404 from "../../Error404";

import { Pagination } from "antd";
import Loading from "../../Loading";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { instance } from "../../../Api/instance";

const CharList = () => {
  const [characters, setCharacters] = useState([]);
  const [totalPages, setTotalPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    page: '',
    gender: '',
    status: '',
    name: '',
    species: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error404, setError404] = useState(false);

  const updateFilters = (newFilters) => {
    const updatedFilters = { ...queryParams, ...newFilters };
    setQueryParams(updatedFilters);
  
    const filteredFilters = Object.fromEntries(
      Object.entries(updatedFilters).filter(([_, value]) => value)
    );
  
    const newSearchParams = new URLSearchParams(filteredFilters);
    setSearchParams(newSearchParams, { replace: true });
  };

  useEffect(() => {
    const newQueryParams = {};
    searchParams.forEach((value, key) => {
      newQueryParams[key] = value || '';
    });
    setQueryParams((prev) => ({ ...prev, ...newQueryParams }));
  }, [searchParams]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError404(false);
      try {
        const response = await instance.get(`/character`, {params: queryParams});
        if (response.status !== 200) throw new Error(`HTTP error! Status: ${response.status}`);
        setCharacters(response.data.results || []);
        setTotalPage(response.data.info?.pages || 0);
        console.log(response)
        
      } catch (error) {
        setError404(true);
        setCharacters([]);
        setTotalPage(1);
        console.error('Something went wrong:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [queryParams]);

  if (!characters) {
    return <Loading/>;
  }


  return (
    <div className="cont">
      <div className="cont__logo">
        <img src={Logo} alt="Logo" />
      </div>
      <FilterCharacters
        updateFilters={updateFilters}
        queryParams={queryParams}
      />
        {isLoading && <Loading/>}
      <div className="grid">
        {
          characters.map((item) => (
            <CharBox
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              status={item.status}
              species={item.species}
            />
          ))
        }
      </div>
      {error404 && <Error404 />}
      <Pagination onChange={(value) => updateFilters({page: value})} current={queryParams.page} total={totalPages * 10} className="pagination" showSizeChanger={false}/>
    </div>
  );
};

export default CharList;
