import SkeletonCardItem from "../../Skeleton/SkeletonCardItem";
import "./CharList.css";
import FilterCharacters from "../../FilterCharacters/FilterCharacters";
import CharBox from "../CharBox/CharBox";
import Logo from "../../../assets/Logo.png";
import { useChar } from "../../Context/CharContext";
import Error404 from "../../Error404";

import { Pagination } from "antd";
import Loading from "../../Loading";
import { useEffect } from "react";

const CharList = () => {
  const visibleItems = 8;

  const {
    data: charList,
    isLoading,
    setGenderFilter,
    setAliveStatus,
    setSpecies,
    setCharName,
    error404,
    curnPage,
    setCurnPage,
    totalPages
  } = useChar();

  // useEffect(() => {
  //   window.location.href = 
  // },[])

  

  if (!charList) {
    return <Loading/>;
  }


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
      <Pagination onChange={setCurnPage} current={curnPage} total={totalPages * 10} className="pagination" showSizeChanger={false}/>
    </div>
  );
};

export default CharList;
