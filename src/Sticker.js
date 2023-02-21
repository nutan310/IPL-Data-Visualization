import React, { useState } from "react";
import "./Sticker.css";
import seasonWinners from "./StaticData";
function Sticker() {
  const [stickerStyle, setStyle] = useState({ display: "none" });
  const handleShow = () => {
    setStyle({
      display: `${stickerStyle.display === "block" ? "none" : "block"}`,
    });
  };
  let arr = Object.values(seasonWinners);
  let winnerData = {};
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    let k = temp["winnerTeam"];
    if (winnerData[k]) {
      winnerData[k] = winnerData[k] + 1;
    } else {
      winnerData[k] = 1;
    }
  }
  arr = Object.keys(winnerData);
  let sortedArr = arr.map((ele) => {
    return { team: ele, matchesWon: winnerData[ele] };
  });
  sortedArr.sort((a, b) => b["matchesWon"] - a["matchesWon"]);
  return (
    <div className="sticker">
      <h2 onClick={handleShow}>-: Season Leaderboard :-</h2>
      <div style={stickerStyle} className="stickerContaint">
        <table id="styleTable">
          {sortedArr.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{ele["team"]}</td>
                <td>{winnerData[ele["team"]]}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Sticker;
