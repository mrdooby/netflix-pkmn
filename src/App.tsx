import React, { useState } from "react";
import Row from "./Row";
import Pokedex from "./Pokedex";
import List from "./List";
import Banner from "./Banner";
import { Link, Outlet } from "react-router-dom";
function App() {
  return (
    <div>
      <Link to="/pokedex">Pokedex</Link>
      <Link to="/list">List</Link>
      <Banner />
      <Outlet />
    </div>
  );
}

export default App;
