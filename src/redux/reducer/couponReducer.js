let intialState = false
const couponReducer = (state = intialState, action) => {

  switch (action.type) {
    case "COUPON_APPLIED":
      return action.payload;

    default:
      return state;
  }
}
export default couponReducer;