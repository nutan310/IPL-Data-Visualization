import React from "react";
import { useSelector } from "react-redux";

function HOC(OriginalCompo) {
  function NewCompo() {
    let mainData = useSelector((store) => store.state);
    let selectedYear = useSelector((store) => store.selectedYear);
    mainData = mainData.filter((ele) => ele.season === selectedYear);
    return <OriginalCompo mainData={mainData} />;
  }
  return NewCompo;
}

export default HOC;
