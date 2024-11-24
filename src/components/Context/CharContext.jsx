import { createContext, useState, useEffect, useContext } from "react";

const CharacterContext = createContext();
export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [curnPage, setCurnPage] = useState(1);
  const [genderFilter, setGenderFilter] = useState('');
  const [aliveStatus, setAliveStatus] = useState('');
  const [charName, setCharName] = useState('');
  const [species, setSpecies] = useState('');
  const [totalPages, setTotalPage] = useState(42);

  const [isLoading, setIsLoading] = useState(true);
  const [haventFound, setHaventFound] = useState(false);
  const [error404, setError404] = useState(false)
  
  useEffect(() => {
    setCurnPage(1);
    window.scrollTo(0, 0);
  }, [genderFilter, aliveStatus, species, charName]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        ...(curnPage && { page: curnPage, }),
        ...(genderFilter && { gender: genderFilter }),
        ...(aliveStatus && { status: aliveStatus }),
        ...(species && { species: species }),
        ...(charName && { name: charName }),
      });
      console.log(queryParams.toString());
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams}`);
        const responseJson = await response.json();
        console.log(responseJson);
        setData(responseJson.results || []);
        setTotalPage(responseJson.info.pages || []);
        setError404(false);
      } catch (error) {
        setError404(true)
        console.error('Something went wrong:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getData();
  }, [curnPage, genderFilter, aliveStatus, species, charName]);

  return (
    <CharacterContext.Provider
      value={{
        curnPage,
        setCurnPage,
        isLoading,
        genderFilter,
        setGenderFilter,
        aliveStatus,
        setAliveStatus,
        charName,
        setCharName,
        species,
        setSpecies,
        data,
        setHaventFound,
        haventFound,
        setError404,
        error404,
        totalPages
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
