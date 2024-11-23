import React, { useRef } from "react";
import Logo from "../../../assets/rick-and-morty.svg";

import "./EpisodeList.css";
import { useEpisode } from "../../Context/EpisodesContext";
import EpisodeBox from "../EpisodeBox/EpisodeBox";
import { Pagination } from "antd";
import FilterByInput from "../../FilterCharacters/FilterByInput";
import Loading from "../../Loading";
import SkeletonCardItem from "../../Skeleton/SkeletonCardItem";

const EpisodeList = () => {
  const visibleItems = 8
  const { data, episodeName, setEpisodeName, setCurnEpisodePage, isLoading} = useEpisode();
  if (!data) {
    return <Loading/>;
  }

  return (
    <div className="cont">
      <div className="cont__logo_episode">
        <img src={Logo} alt="Logo" />
      </div>
      <FilterByInput setFuction={setEpisodeName} value={episodeName} placeholder='Filter by name or episode (ex. S01 or S01E02)' />
      <div className="grid">
      {isLoading ? (
          Array.from({ length: visibleItems }).map((_, index) => (
            <SkeletonCardItem key={index} />
          ))
        ) : (
        data.map((item) => (
          <EpisodeBox
            name={item.name}
            episode={item.episode}
            date={item.air_date}
            key={item.id}
            id={item.id}
          />
        )))}
      </div>
      <Pagination onChange={setCurnEpisodePage} total={3 * 10} className="pagination" showSizeChanger={false} />
    </div>
  );
};

export default EpisodeList;
