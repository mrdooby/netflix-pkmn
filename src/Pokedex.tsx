import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pokedex.css";
import PokedexObj from "./PokedexObj";
import { Link, NavLink, Outlet } from "react-router-dom";

interface PkmnObj {
  name: string;
  sprite: string;
}

function Pokedex() {
  return (
    <div className="pokedex">
      {PokedexObj.map((p: PkmnObj, i: number) => {
        return (
          <Link to={`/pokedex/cards/${i + 1}`}>
            <div key={p.name} className="pokedex__block">
              <img className="pokedex__pkmn" src={p.sprite} alt={p.name} />
              <div>{p.name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Pokedex;
