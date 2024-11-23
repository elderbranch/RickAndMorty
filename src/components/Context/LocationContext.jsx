import { createContext, useState, useEffect, useContext } from "react";

const LocationContext = createContext();
export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [locationName, setLocationName] = useState('');
  const [curnLocationPage, setCurnLocationPage] = useState(1);
  const [totalPages, setTotalPage] = useState(42);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    setCurnLocationPage(1);
    window.scrollTo(0, 0);
  }, [locationName, curnLocationPage]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: curnLocationPage,
        ...(locationName && { name: locationName }),
      });
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location/?${queryParams}`);
        const responseJson = await response.json();
        if (response.ok) {
          setData(responseJson.results || []);
          setTotalPage(responseJson.info.pages);
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
  }, [locationName, curnLocationPage]);

  return (
    <LocationContext.Provider
      value={{
        data,
        locationName,
        setLocationName,
        curnLocationPage,
        setCurnLocationPage,
        isLoading,
        totalPages
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
