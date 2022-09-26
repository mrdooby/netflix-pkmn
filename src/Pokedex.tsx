import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pokedex.css";
import PokedexObj from "./PokedexObj";
import PokedexFlavor from "./PokedexFlavor";
import { Link, NavLink, Outlet } from "react-router-dom";

interface PkmnObj {
  name: string;
  sprite: string;
}

function Pokedex() {
  const [info, setInfo] = useState<any>([]);

  const getCards = async (num: number) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${num}/`);
      const fileterdFlavorTextEntries = data.flavor_text_entries.filter(
        (element: any) => element.language.name === "en"
      );
      // If there's any entries, let's get the first one
      const flavorTextEntry =
        fileterdFlavorTextEntries.length > 0 ? fileterdFlavorTextEntries[0] : {};
      return flavorTextEntry.flavor_text;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const nationalIds = Array.from(Array(152).keys()).slice(1);
    try {
      nationalIds.map((id) => {
        getCards(id).then((res) => {
          info[id - 1] = res;
          setInfo(info);
        });
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="pokedex">
      {PokedexObj.map((p: PkmnObj, i: number) => {
        return (
          <Link key={p.name} to={`/pokedex/cards/${i + 1}`}>
            <div className="pokedex__block">
              <div className="pokedex__id">
                {i + 1}. {p.name}
              </div>
              <img className="pokedex__img" src={p.sprite} alt={p.name} />
              <div className="pokedex__flavor">
                <span>{PokedexFlavor[i]}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Pokedex;
