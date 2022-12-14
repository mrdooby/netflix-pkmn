import React, { useEffect, useState, ReactElement } from "react";
import axios from "axios";
import "./Row.css";
import { useParams } from "react-router-dom";

function Row() {
  const [cards, setCards] = useState([]);
  const [pkmnName, setPkmnName] = useState("");

  const { nationalId } = useParams();
  const natId = Number(nationalId);

  const getName = async (num: number) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}/`);
      console.log(data);
      return data.name;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      getName(natId).then((res) => {
        setPkmnName(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, [natId]);

  const getCards = async (num: number) => {
    try {
      const { data } = await axios.get("https://api.pokemontcg.io/v2/cards", {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "6797abcc-46dc-4de2-9508-1da504c6530f"
        },
        params: { q: `nationalPokedexNumbers:${num}` }
      });
      return data.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    try {
      getCards(natId).then((res) => {
        setCards(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, [natId]);

  return (
    <div className="row">
      <h2 className="name">{pkmnName}</h2>
      <div className="row__posters">
        {cards?.map((card: any): ReactElement => {
          return (
            <div>
              <img className="row__poster" key={card.id} src={card.images.small} alt={card.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Row;
