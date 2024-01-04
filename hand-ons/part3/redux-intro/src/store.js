import { combineReducers, createStore } from "redux";
import accountReducer from "./accountSlice";
import customerReducer from "./customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer);

export default store;

