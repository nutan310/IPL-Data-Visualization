import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Footer from "./Footer";
import MoM from "./MoM";
import Player from "./Player";
import Stadium from "./Stadium";
import Sticker from "./Sticker";
import Toss from "./Toss";
import WinChart from "./WinChart";
import Winner from "./Winner";
import Years from "./Years";
import posts from "./InputData";
function App() {
  let dispatch = useDispatch();
  dispatch({ type: "fetched", payload: posts });

  return (
    <div className="App">
      <Winner />
      <Years />
      <div className="bodyData">
        <div className="appCharts">
          <div className="WinChart">
            <WinChart />
          </div>
          <div className="tossChart">
            <h3>Toss-Wise Match Won</h3>
            <Toss />
          </div>
          <div className="tri">
            <MoM />
          </div>
          <div className="momImage">
            <Player />
          </div>
        </div>
        <div className="stadiumChart">
          <Stadium />
        </div>
      </div>
      <div className="stickerCompo">
        <Sticker />
      </div>
      <Footer />
    </div>
  );
}

export default App;
