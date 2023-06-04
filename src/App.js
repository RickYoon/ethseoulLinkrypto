import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopNav from "component/topNav"
import ScrollToTop from "./component/scrollTop"

import Manage from "pages/Manage"
import Findpools from "pages/Findpools"
import Detail from "pages/Detail"

import './App.css';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<TopNav />} />
          <Route path="/manage" element={<TopNav />} />
          <Route path="/findpools" element={<TopNav />} />
          <Route path="/detail/:id" element={<TopNav />} />
        </Routes>
        <Routes>
          <Route exact path="/" element={<Manage />} />
          <Route exact path="/manage" element={<Manage />} />
          <Route exact path="/findpools" element={<Findpools />} />
          <Route exact path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
