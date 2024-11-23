import React, { createContext, useState, useEffect, useContext } from "react";

const EpisoderContext = createContext();
export const useEpisode = () => useContext(EpisoderContext);

export const EpisodeProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [episodeName, setEpisodeName] = useState('');
  const [curnEpisodePage, setCurnEpisodePage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurnEpisodePage(1);
    window.scrollTo(0, 0);
  }, [ episodeName, curnEpisodePage, ]);
  

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
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
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 400)
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        setIsLoading(false)
      }
    };

    getData();
  }, [episodeName, curnEpisodePage]);

  return (
    <EpisoderContext.Provider
      value={{
        data,
        episodeName,
        setEpisodeName,
        curnEpisodePage,
        setCurnEpisodePage,
        isLoading
      }}
    >
      {children}
    </EpisoderContext.Provider>
  );
};
