import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Champions from "./pages/Champions";
import Leaderboard from "./pages/Leaderboard";
import SearchedSummoner from "./pages/SearchedSummoner";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/search/:region/:summonerName" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
