let initialState = {
  state: [],
  selectedYear: 2008,
  result: {
    seasonWinner: "Rajasthan Royals",
    runnerUp: "Kings XI Punjab",
    manOfSeries: "SE Marsh",
  },
};

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case "fetched":
      return { ...state, state: action.payload };
    case "year":
      return { ...state, selectedYear: action.payload };
    case "seasonWinner":
      return { ...state, result: { ...state.result, ...action.payload } };
    default:
      return state;
  }
};

export default reducer;
