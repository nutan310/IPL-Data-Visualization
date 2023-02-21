import React, { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { useDispatch, useSelector } from "react-redux";
import store from "./store";
import HOC from "./HOC";
function WinChart({ mainData }) {
  let dispatch = useDispatch();
  let selectedYear = useSelector((store) => store.selectedYear);
  let winObj = {};
  for (let i = 0; i < mainData.length; i++) {
    let k = mainData[i].winner;
    if (winObj[k]) {
      winObj[k] = winObj[k] + 1;
    } else if (k != "") {
      winObj[k] = 1;
    }
  }

  let allTeams = Object.keys(winObj);

  //for winner and runner-up of season
  let seasonWinner = "";
  let runnerUp = "";
  let seasonMaxWin = 0;
  for (let i = 0; i < allTeams.length; i++) {
    if (winObj[allTeams[i]] > seasonMaxWin) {
      seasonWinner = allTeams[i];
      seasonMaxWin = winObj[allTeams[i]];
    }
  }

  let runnerUpWin = 0;
  for (let i = 0; i < allTeams.length; i++) {
    if (winObj[allTeams[i]] > runnerUpWin && allTeams[i] !== seasonWinner) {
      runnerUp = allTeams[i];
      runnerUpWin = winObj[allTeams[i]];
    }
  }

  //season

  let matchesPlayed = {};
  for (let i = 0; i < allTeams.length; i++) {
    matchesPlayed[allTeams[i]] = 0;
  }
  for (let i = 0; i < mainData.length; i++) {
    let k1 = mainData[i].team1;
    let k2 = mainData[i].team2;
    matchesPlayed[k1] = matchesPlayed[k1] + 1;
    matchesPlayed[k2] = matchesPlayed[k2] + 1;
  }

  useEffect(() => {
    dispatch({
      type: "seasonWinner",
      payload: { seasonWinner: seasonWinner, runnerUp: runnerUp },
    });
  }, [selectedYear]);

  let data1 = allTeams.map((team) => {
    return { x: team, y: winObj[team] };
  });
  let data2 = allTeams.map((team) => {
    return { x: team, y: matchesPlayed[team] - winObj[team] };
  });

  return (
    <div className="control-pane">
      <div className="control-section">
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          legendSettings={{ enableHighlight: true }}
          primaryXAxis={{
            labelIntersectAction: "Rotate45",
            valueType: "Category",
          }}
          primaryYAxis={{
            title: "Number of Matches Played",
            labelFormat: "{value}",
          }}
          width={"100%"}
          chartArea={{ border: { width: 0 } }}
          title="Matches Won and Lost by teams"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              StackingColumnSeries,
              Category,
              Legend,
              Tooltip,
              Highlight,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data1}
              xName="x"
              yName="y"
              name="WON"
              columnWidth={0.6}
              border={{ width: 1, color: "white" }}
              type="StackingColumn"
            ></SeriesDirective>
            <SeriesDirective
              dataSource={data2}
              xName="x"
              yName="y"
              name="LOST"
              columnWidth={0.6}
              border={{ width: 1, color: "white" }}
              type="StackingColumn"
            ></SeriesDirective>
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
}

export default HOC(WinChart);
