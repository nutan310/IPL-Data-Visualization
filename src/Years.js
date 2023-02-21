import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./years.css";

function Years() {
  let arr = [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
  const [state, setState] = useState(2008);
  const liStyle = {
    backgroundColor: "tomato",
  };
  let dispatch = useDispatch();
  const handleClick = (e) => {
    if (e.target.value) {
      dispatch({ type: "year", payload: Number(e.target.value) });
      setState(e.target.value);
    }
  };
  return (
    <div className="years">
      <h2>SELECT YEAR TO RENDER DATA</h2>
      <ul className="years_ul" onClick={(e) => handleClick(e)}>
        {arr.map((ele, index) => {
          return (
            <li
              className="years_li"
              style={
                state == ele
                  ? { backgroundColor: "green", color: "white" }
                  : liStyle
              }
              value={ele}
              key={index}
            >
              IPL-{ele}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Years;
