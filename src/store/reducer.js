import { combineReducers } from "redux-immutable";
import { SHOW_MASK } from "./constant";
const homeDefaultState = {
  showMask: false,
};

function reducer(state = homeDefaultState, action) {
  switch (action.type) {
    case SHOW_MASK:
      return { ...state, showMask: action.payload };
    default:
      return state;
  }
}
const cReducer = combineReducers({
  main: reducer,
});

export default cReducer;
