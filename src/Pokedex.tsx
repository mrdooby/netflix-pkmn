import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pokedex.css";

interface PkmnObj {
  name: string;
  sprite: string;
}

function Pokedex() {
  const [pkmn, setPkmn] = useState<any>([]);

  const getPkmn = async (num: number) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
      return { name: data.name, sprite: data.sprites.front_default };
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const nationalIds = Array.from(Array(151).keys()).slice(1);
    try {
      nationalIds.map((id) => {
        getPkmn(id).then((res) => {
          pkmn[id - 1] = res;
          setPkmn(pkmn);
        });
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className="pokedex">
      {pkmn.map((p: PkmnObj) => {
        return (
          <div className="pokedex__block">
            <img className="pokedex__pkmn" key={p.name} src={p.sprite} alt={p.name} />
            <div>{p.name}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Pokedex;
