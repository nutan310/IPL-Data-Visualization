import React from "react";
import { useSelector } from "react-redux";
import store from "./store";
import "./winner.css";

function Winner() {
  let season = useSelector((store) => store.result);
  let year = useSelector((store) => store.selectedYear);

  return (
    <div className="winner">
      <img className="winnerHeading" src="IPL.png" />

      <div className="winnerBlock">
        <h3 className="winnerDetail">Season</h3>
        <h3 className="winnerName">IPL-{year}</h3>
      </div>
      <div className="winnerBlock">
        <h3 className="winnerDetail">Winner</h3>
        <h3 className="winnerName">
          {season.seasonWinner ? season.seasonWinner : "Rajasthan Royals"}
        </h3>
      </div>
      <div className="winnerBlock">
        <h3 className="winnerDetail">Runner Up</h3>
        <h3 className="winnerName">
          {season.runnerUp ? season.runnerUp : "Kings XI Punjab"}
        </h3>
      </div>
      <div className="winnerBlock">
        <h3 className="winnerDetail">Man of Series</h3>
        <h3 className="winnerName">
          {season.manOfSeries ? season.manOfSeries : "SE Marsh"}
        </h3>
      </div>
    </div>
  );
}

export default Winner;
