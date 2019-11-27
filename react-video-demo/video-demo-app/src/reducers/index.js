import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import videos from "./videos";

const rootReducer = combineReducers({
  videos,
  routing: routerReducer,
  form: formReducer
});

export default rootReducer;
