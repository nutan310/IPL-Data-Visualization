import React from "react";
import "./toss.css";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import HOC from "./HOC";

function Toss({ mainData }) {
  let batWin = 0;
  let fieldWin = 0;
  for (let i = 0; i < mainData.length; i++) {
    let temp = mainData[i];
    if (
      temp["toss_decision"] === "bat" &&
      temp["toss_winner"] === temp["winner"]
    ) {
      batWin++;
    }
    if (
      temp["toss_decision"] === "field" &&
      temp["toss_winner"] === temp["winner"]
    ) {
      fieldWin++;
    }
  }
  const pieChartData = [
    { x: "Bat", y: batWin },
    { x: "Field", y: fieldWin },
  ];
  return (
    <div className="tossDiv">
      <AccumulationChartComponent
        width={"400"}
        id="pieCharts"
        legendSettings={{ background: "white" }}
        tooltip={{ enable: true }}
        height={"80%"}
        margin={"0px"}
      >
        <Inject
          services={[
            AccumulationLegend,
            PieSeries,
            AccumulationDataLabel,
            AccumulationTooltip,
          ]}
        />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            dataSource={pieChartData}
            xName="x"
            yName="y"
            innerRadius="40%"
          ></AccumulationSeriesDirective>
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    </div>
  );
}

export default HOC(Toss);
