import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './component/Header';
import HomePage from './component/HomePage';
import Staking from './component/StakingPage';
import StakingNew from './component/StakingPageNew';
import HeaderM from './component/HeaderM';
import StakingM from './component/StakingPageM';
import StakingNewM from './component/StakingPageNewM';
function App() {

  var browserMob = false;
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // true for mobile device
          browserMob = true;
          //alert(browserW);
        }else{
          // false for not mobile device
          browserMob = false;
          //alert(browserW);
        }

  return (
    <div className="App">
      <BrowserRouter>
      {browserMob === false ? (
        <Header />
      ) : (
        <HeaderM />
      )}
        <Routes>
        {browserMob === false ? (
          <Route path="/" element={<HomePage />} />
          ) : (
            <Route path="/" element={<HomePage />} /> 
          )}

          {browserMob === false ? (
              <Route path="/ZombiePage" element={<HomePage />} />
          ) : (
              <Route path="/ZombiePage" element={<HomePage />} />
          )}

          {browserMob === false ? (
          <Route path="/StakingPage" element={<Staking />} />
          ):(
            <Route path="/StakingPage" element={<StakingM />} />
          )}

          {browserMob === false ? (
          <Route path="/StakingPageNew" element={<StakingNew />} />
          ):(
          <Route path="/StakingPageNew" element={<StakingNewM />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
