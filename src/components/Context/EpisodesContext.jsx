import React, { createContext, useState, useEffect, useContext } from "react";

const episoderContext = createContext();
export const useEpisode = () => useContext(episoderContext);

export const EpisodeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [episodeName, setEpisodeName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [curnEpisodePage, setCurnEpisodePage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: curnEpisodePage,
        ...(episodeName && { name: episodeName }),
      });
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/?${queryParams}`);
        const responseJson = await response.json();
        if (response.ok) {
          setData(responseJson.results || []);
          console.log(response);
        } else {
          console.error('Error fetching episodes:', responseJson.error);
        }
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [episodeName]);

  return (
    <episoderContext.Provider
      value={{ data, episodeName, setEpisodeName,curnEpisodePage, setCurnEpisodePage }}
    >
      {children}
    </episoderContext.Provider>
  );
};
