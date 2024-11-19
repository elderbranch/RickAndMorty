import React, { useState } from "react";
import SkeletonCardItem from "../../Skeleton/SkeletonCardItem";
import "./CharList.css";
import FilterCharacters from "../../FilterCharacters/FilterCharacters";
import CharBox from "../CharBox/CharBox";
import Logo from "../../../assets/Logo.png";
import { useChar } from "../../Context/CharContext";
import { useEpisode } from "../../Context/EpisodesContext";
import Error404 from "../../Error404";

import { Pagination } from "antd";

const CharList = () => {
  const visibleItems = 8;

  const {
    data: charList,
    isLoading,
    genderFilter,
    setGenderFilter,
    aliveStatus,
    setAliveStatus,
    species,
    setSpecies,
    charName,
    setCharName,
    error404,
    setError404,
    curnPage,
    setCurnPage
  } = useChar();

  console.log(charList)

  const episodes = useEpisode();
  console.log(episodes);

  console.log(error404)

  return (
    <div className="cont">
      <div className="cont__logo">
        <img src={Logo} alt="Logo" />
      </div>
      <FilterCharacters
        setGenderFilter={setGenderFilter}
        setAliveStatus={setAliveStatus}
        setSpecies={setSpecies}
        setCharName={setCharName}
        aliveStatus={aliveStatus}
        genderFilter={genderFilter}
        species={species}
        charName={charName}
      />
      <div className="grid">
        {isLoading ? (
          Array.from({ length: visibleItems }).map((_, index) => (
            <SkeletonCardItem key={index} />
          ))
        ) : (
          charList.map((item) => (
            <CharBox
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              status={item.status}
              species={item.species}
            />
          ))
        )}
      </div>
      {error404 && <Error404 />}
      <Pagination onChange={setCurnPage} total={42 * 10} className="pagination" showSizeChanger={false}/>
    </div>
  );
};

export default CharList;
