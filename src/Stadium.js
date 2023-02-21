import React from "react";
import "./stadium.css";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingBarSeries,
  Tooltip,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import HOC from "./HOC";

function Stadium({ mainData }) {
  let matchesPlayed = {};

  for (let i = 0; i < mainData.length; i++) {
    let k = mainData[i].venue;
    if (matchesPlayed[k]) {
      matchesPlayed[k] = matchesPlayed[k] + 1;
    } else {
      matchesPlayed[k] = 1;
    }
  }
  let allStadium = Object.keys(matchesPlayed);
  let data = allStadium.map((stadium) => {
    return { x: stadium, y: matchesPlayed[stadium] };
  });

  return (
    <div className="control-section">
      <ChartComponent
        id="stadiumCharts"
        style={{ textAlign: "center" }}
        legendSettings={{ enableHighlight: true }}
        primaryXAxis={{
          valueType: "Category",
          majorGridLines: { width: 0 },
          majorTickLines: { width: 0 },
        }}
        width={"90%"}
        height={"800px"}
        chartArea={{ border: { width: 0 } }}
        primaryYAxis={{
          title: "Matches Played",
          lineStyle: { width: 0 },
          majorTickLines: { width: 0 },

          edgeLabelPlacement: "Shift",
        }}
        title="Stadium-wise Matches Played"
        tooltip={{ enable: true }}
      >
        <Inject
          services={[StackingBarSeries, Category, Legend, Tooltip, Highlight]}
        />
        <SeriesCollectionDirective>
          <SeriesDirective
            id="stadiumSeriesDirective"
            dataSource={data}
            // width={10}
            xName="x"
            yName="y"
            border={{ width: 1, color: "white" }}
            columnWidth={0.6}
            name="Matches played"
            type="StackingBar"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
}

export default HOC(Stadium);
