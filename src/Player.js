import React from "react";
import { useSelector } from "react-redux";
import "./player.css";
import store from "./store";
import seasonWinners from "./StaticData";
function Player() {
  let selectedYear = useSelector((store) => store.selectedYear);
  const { wiki, playerImg } = seasonWinners[selectedYear];
  return (
    <>
      <h3 className="playerH3">
        Man Of The Series <span>(Click on image to see details)</span>{" "}
      </h3>
      <a className="playerLink" href={wiki} target="_blank">
        <img alt="Player Image" src={playerImg} />
      </a>
    </>
  );
}

export default Player;
