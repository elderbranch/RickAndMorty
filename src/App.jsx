import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from './components/Header/Header';
import CharList from './components/Characters/CharList/CharList';
import ChartDetails from "./components/Characters/CharDetails/CharDetailce";
import EpisodeList from "./components/Episodes/EpisodesList/EpisodeList";
import { EpisodeProvider } from "./components/Context/EpisodesContext";
import Big404 from "./components/Big404";
import EpisodeDetails from "./components/Episodes/EpisodeDetails/EpisodeDetails";
import { LocationProvider } from "./components/Context/LocationContext";
import LocaionList from "./components/Locations/LocationList/LocaionList";
import LocationDetails from "./components/Locations/LocationDetails/LocationDetails";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'*'} element={<Big404 />} />
        <Route path='/characters' element={<CharList />} />
        <Route path="/character/:id" element={<ChartDetails />} />
        <Route path='/episodes' element={<EpisodeProvider><EpisodeList /></EpisodeProvider>} />
        <Route path='/episode/:id' element={<EpisodeDetails />} />
        <Route path='/locations' element={<LocationProvider><LocaionList /></LocationProvider>} />
        <Route path='/location/:id' element={<LocationDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
