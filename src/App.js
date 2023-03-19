import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './component/Header';
import HomePage from './component/HomePage';
import Staking from './component/StakingPage';
import StakingNew from './component/StakingPageNew';

function App() {
  return (
    <div className="App">
      <BrowserRouter>      
          <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ZombiePage" element={<HomePage />} />
          <Route path="/StakingPage" element={<Staking />} />
          <Route path="/StakingPageNew" element={<StakingNew />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
