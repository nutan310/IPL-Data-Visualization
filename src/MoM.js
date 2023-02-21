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
function MoM({ mainData }) {
  let manOfMatch = {};
  let selectedYear = useSelector((store) => store.selectedYear);
  let dispatch = useDispatch();
  for (let i = 0; i < mainData.length; i++) {
    let k = mainData[i].player_of_match;
    if (manOfMatch[k]) {
      manOfMatch[k] = manOfMatch[k] + 1;
    } else {
      manOfMatch[k] = 1;
    }
  }
  let allPlayers = Object.keys(manOfMatch);
  let data = allPlayers.map((player) => {
    return { x: player, y: manOfMatch[player] };
  });
  data.sort((a, b) => {
    return b["y"] - a["y"];
  });
  data = data.slice(0, 10);
  let temp = data[0]
  temp = temp?temp["x"]:""

  useEffect(() => {
    dispatch({ type: "seasonWinner", payload: { manOfSeries: temp} });
  }, [selectedYear]);
  return (
    <div>
      <div className="control-section">
        <ChartComponent
          id="momCharts"
          style={{ textAlign: "center" }}
          legendSettings={{ enableHighlight: true }}
          primaryXAxis={{
            labelIntersectAction: "Rotate45",
            valueType: "Category",
          }}
          primaryYAxis={{
            title: "Number of MoM Awards",
            labelFormat: "{value}",
          }}
          width={"100%"}
          chartArea={{ border: { width: 0 } }}
          title="Man of the Match"
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
              dataSource={data}
              xName="x"
              yName="y"
              name="Man of the Match"
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

export default HOC(MoM);
