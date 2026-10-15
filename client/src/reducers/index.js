import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import adminReducer from "./adminReducer";

const rootReducer = combineReducers({
    admin: adminReducer,
    user: userReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))