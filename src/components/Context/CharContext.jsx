import React, { createContext, useState, useEffect, useContext } from "react";

const CharacterContext = createContext();
export const useChar = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [curnPage, setCurnPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [haventFound, setHaventFound] = useState(false);
  const [genderFilter, setGenderFilter] = useState('');
  const [aliveStatus, setAliveStatus] = useState('');
  const [charName, setCharName] = useState('');
  const [species, setSpecies] = useState('');

  const [error404, setError404] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: curnPage,
        ...(genderFilter && { gender: genderFilter }),
        ...(aliveStatus && { status: aliveStatus }),
        ...(species && { species: species }),
        ...(charName && { name: charName }),
      });

      console.log(queryParams.toString());
      let response = '';
      try {
        response = await fetch(`https://rickandmortyapi.com/api/character/?${queryParams}`);
        const responseJson = await response.json();
        setData(responseJson.results || []);
        console.log(data)
      } catch (error) {
        // setError404(true);
        throw new Error('Something went wrong');
      } finally {
        setIsLoading(false)
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
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
