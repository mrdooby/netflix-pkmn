import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Row.css";
interface RowProps {
  natId: number;
}

function Row({ natId }: RowProps) {
  const [cards, setCards] = useState([]);
  const [pkmnName, setPkmnName] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    try {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.onresize = handleResize;
    } catch (err) {
      console.error(err);
    }
  }, [window.innerWidth]);

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
      <h2>{pkmnName}</h2>
      <Carousel
        containerClass="row__container"
        responsive={{
          desktop: {
            breakpoint: {
              max: width,
              min: 272
            },
            items: Math.floor(window.innerWidth / 272),
            slidesToSlide: Math.floor(window.innerWidth / 272) - 1 || 1,
            partialVisibilityGutter: 40
          }
        }}
      >
        {cards?.map((card: any) => {
          return <img className="row__poster" key={card.id} src={card.images.small} />;
        })}
      </Carousel>
    </div>
  );
}

export default Row;
