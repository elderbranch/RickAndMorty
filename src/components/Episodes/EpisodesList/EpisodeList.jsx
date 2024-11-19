import React, { useRef } from "react";
import Logo from "../../../assets/rick-and-morty.svg";

import "./EpisodeList.css";
import { useEpisode } from "../../Context/EpisodesContext";
import EpisodeBox from "../EpisodeBox/EpisodeBox";
import { Pagination } from "antd";
import FilterByInput from "../../FilterCharacters/FilterByInput";

const EpisodeList = () => {
  const { data, episodeName, setEpisodeName, setCurnEpisodePage } = useEpisode();
  console.log(data);

  return (
    <div className="cont">
      <div className="cont__logo_episode">
        <img src={Logo} alt="Logo" />
      </div>
      <FilterByInput setFuction={setEpisodeName} value={episodeName} placeholder='Filter by name or episode (ex. S01 or S01E02)' />
      <div className="grid">
        {data.map((item) => (
          <EpisodeBox
            name={item.name}
            episode={item.episode}
            date={item.air_date}
            key={item.id}
          />
        ))}
      </div>
      <Pagination onChange={setCurnEpisodePage} total={3 * 10} className="pagination" showSizeChanger={false} />
    </div>
  );
};

export default EpisodeList;
