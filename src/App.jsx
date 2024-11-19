import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CharacterProvider } from "./components/Context/CharContext";

import Header from './components/Header/Header';
import CharList from './components/Characters/CharList/CharList';
import ChartDetails from "./components/Characters/CharDetails/CharDetailce";
import EpisodeList from "./components/Episodes/EpisodesList/EpisodeList";
import { EpisodeProvider } from "./components/Context/EpisodesContext";
import Error404 from "./components/Error404";

function App() {
  return (
    <CharacterProvider>
      <EpisodeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={'*'} element={<Error404 />} />
            <Route path='/characters' element={<CharList />} />
            <Route path="/character/:id" element={<ChartDetails />} />
            <Route path='/episodes' element={<EpisodeList />} />
          </Routes>
        </BrowserRouter>
      </EpisodeProvider>
    </CharacterProvider>

  )
}

export default App;
