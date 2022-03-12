import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

import Header from '../Header';
import GifPortal from '../GifPortal';
import NftDrop from '../NftDrop/app/src';
import Landing from '../Landing';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
      <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/*" element={<Landing />} />
        <Route path="portal" element={<GifPortal />} />
        <Route path="nfts" element={<NftDrop />} />
      </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
