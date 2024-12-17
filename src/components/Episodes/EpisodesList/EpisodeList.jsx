import React, { useEffect, useState } from "react";
import Logo from "../../../assets/rick-and-morty.svg";

import "./EpisodeList.css";
import EpisodeBox from "../EpisodeBox/EpisodeBox";
import { Pagination } from "antd";
import FilterByInput from "../../FilterCharacters/FilterByInput";
import Loading from "../../Loading";
import { instance } from "../../../services/ApiServices";
import { useSearchParams } from "react-router-dom";
import Error404 from "../../Error404";

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [totalPages, setTotalPage] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    page: '',
    name: '',
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const newQueryParams = {};
    searchParams.forEach((value, key) => {
      newQueryParams[key] = value || '';
    });
    setQueryParams((prev) => ({ ...prev, ...newQueryParams }));
  }, [searchParams]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      setError(false)
      try {
        const response = await instance.get(`/episode`, { params: queryParams });
        setEpisodes(response.data.results || []);
        setTotalPage(response.data.info?.pages || 0);
        console.log(response);
      } catch (error) {
        console.error('Error:', error.message);
        setEpisodes([])
        setError(true)
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  }, [queryParams]);

  const updateFilters = (newFilters) => {
    const updatedFilters = {...queryParams, ...newFilters};
    setQueryParams(updatedFilters);

    const filteredFilters = Object.fromEntries(
      Object.entries(updatedFilters).filter(([_, value]) => value)
    );

    const newSearchParams = new URLSearchParams(filteredFilters);
    setSearchParams(newSearchParams, { replace: true });
  }

  return (
    <div className="cont">
      <div className="cont__logo_episode">
        <img src={Logo} alt="Logo" />
      </div>
      <FilterByInput setFuction={updateFilters} value={queryParams.name} placeholder='Filter by name or episode (ex. S01 or S01E02)' />
      {error && <Error404 />}
      {isLoading ? <Loading/> : (<div className="grid">
        {episodes.map((item) => (
          <EpisodeBox
            name={item.name}
            episode={item.episode}
            date={item.air_date}
            key={item.id}
            id={item.id}
          />
        ))}
      </div>)}
      
      <Pagination onChange={(value) => updateFilters({page: value})} current={queryParams.page} total={totalPages * 10} className="pagination" showSizeChanger={false} />
    </div>
  );
};

export default EpisodeList;
