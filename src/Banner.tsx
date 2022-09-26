import React, { useState } from "react";
import "./Banner.css";

function Banner() {
  return (
    <div className="banner">
      <img
        className="banner__img"
        src={
          "https://wallpapershome.com/images/wallpapers/pokemon-go-3840x2160-poster-4k-15132.jpg"
        }
        alt="pkmn go"
      />
      <div className="fadeBottom">.</div>
    </div>
  );
}

export default Banner;
