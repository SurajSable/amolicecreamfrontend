import userReducer from "./userReducer";
import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import cartReduce from "./cartReducer";
import drawerReducer from "./drawerReducer";
import couponReducer from "./couponReducer";
import { CODReducer } from "./CODreducer";

const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReduce,
    drawer: drawerReducer,
    coupon: couponReducer,
    COD: CODReducer,
})
export default rootReducer;