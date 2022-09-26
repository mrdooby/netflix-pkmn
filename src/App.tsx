import React, { useState } from "react";
import Row from "./Row";
import Pokedex from "./Pokedex";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigateToCards = () => {
    navigateToCards("/cards");
  };
  return (
    <div>
      <Pokedex />

      <Routes>
        <Route path="/contacts" element={<Row />} />
        <Route path="/" element={<Pokedex />} />
      </Routes>
    </div>
  );
}

export default App;
