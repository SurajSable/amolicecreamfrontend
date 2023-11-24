let intialState = []
if (typeof window !== "undefined") {
    // if cart is in local storage GET it
    if (localStorage.getItem("cart")) {
        intialState = JSON.parse(localStorage.getItem("cart"));
    }
}
const cartReducer = (state = intialState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return action.payload;

        default:
            return state;
    }
}
export default cartReducer;