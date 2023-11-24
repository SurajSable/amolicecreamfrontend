import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userCart } from "../functions/user";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import EmptyCart from "../components/EmptyCart";
const selectUserCartData = createSelector(
  state => state.user,
  state => state.cart,
  (user, cart) => ({ user, cart })
);
const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { user, cart } = useSelector(selectUserCartData);
  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    alert("save order to db");
    userCart(cart, user.token)
      .then((res) => {
        if (res.ok) navigate("/checkout");
      })
      .catch((err) => {
        console.error("cart save err", err);
      });
  };
  const saveCashOrderToDb = () => {
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        if (res.ok) navigate("/checkout");
      })
      .catch((err) => console.error("cart save err", err));
  };

  const handleAddCart = () => {
    if (user && user.token) {
    } else {
      navigate("/login",
        {
          state: { from: "/cart" },
        });
    }
  };

  const showCartItems = () => (
    <table className="table table-bordered p-auto">
      <thead className="thead-light ">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th
            scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );
  return (
    <div className="container-fluid btn-group mt-5 pt-5">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart / {cart.length} Product</h4>
          {!cart.length ? (<>
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
            <EmptyCart />
          </>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ₹ {c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total: <b>₹ {getTotal()}</b>
          <hr />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-warning mt-2"
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2"
              onClick={handleAddCart}>
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Cart;
