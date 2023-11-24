import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart } from "../functions/user";
import { emptyUserCart, createCashOrderForUser } from "../functions/user";
import { toast } from "react-toastify";
import { saveAddress } from "../functions/user";
import 'react-quill/dist/quill.snow.css';
import { applyCoupon } from "../functions/user";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const user = useSelector((state) => state.user)
  const COD = useSelector((state) => state.COD)
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("")
  const [pincode, setPincode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [number, setNumber] = useState("")
  const [addressSave, setAddressSave] = useState(false)
  const [coupon, setCoupon] = useState(" ")
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discountError, setDiscountError] = useState("")

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        //console.log("user cart res", JSON.stringify(res, null, 4));
        setProducts(res.products);
        setTotal(res.cartTotal);
      })
      .catch((error) => {
        console.log("Error fetching user cart:", error);
      });
  }, []);

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setTotalAfterDiscount(0)
      setDiscountError("")
      setCoupon("")
      setProducts([]);
      setTotal(0);
      toast.success("Cart is emapty. Contniue shopping.");
    }).catch((error) => {
      console.log("Error emptying user cart:", error);
    });
  };
  const saveAddressToDb = () => {
    saveAddress(address, user.token).then((res) => {
      if (res.ok) {
        setAddressSave(true)
        toast.success("Address Saved")
      }
    })
  };

  const addressForm = () => {
    const isAddressValid = address && pincode && city && state && number;
    return (
      <>
        <div className='d-flex flex-column mt-5 pt-5'>
          <h1 className='pb-4 h4 font-weight-bold'>Delivery Address</h1>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission
            if (isAddressValid) {
            }
          }}
          className='d-flex flex-column gap-3'
          style={{ width: '90%' }}
        >
          <div className='d-flex gap-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Address'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              placeholder='Pincode'
              value={pincode}
              required
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className='d-flex gap-3'>
            <input
              type='text'
              className='form-control'
              placeholder='City'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type='text'
              className='form-control'
              placeholder='State'
              value={state}
              required
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <input
            type='tel'
            className='form-control'
            placeholder='Mobile Number'
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <button type='submit' className='btn btn-warning text-white fw-bold ' onClick={saveAddressToDb}
            disabled={!isAddressValid}>
            Save And Delivery Here
          </button>
        </form>
      </>
    )
  }
  const showProductSummary = () => {
    return (
      <>
        {products.map((p, i) => (
          <div key={i}>
            <p>
              {p.product?.title} x {p?.count} ={" "}
              {p?.product.price * p?.count}
            </p>
          </div>
        ))}
      </>
    )
  }

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token)
      .then((res) => {
        if (res.err) {
          setDiscountError(res.err)
          setTotalAfterDiscount(0)
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
        }
        else {
          setTotalAfterDiscount(res)
          dispatch({
            type: "COUPON_APPLIED",
            payload: true,
          });
        }
      })
  }

  const showApplyCoupon = () => {
    return (
      <>
        <input onChange={(e) => {
          setCoupon(e.target.value)
          setDiscountError("")
        }}
          value={coupon}
          type="text"
        />
        <br />
        <button className="btn btn-primary mt-2" onClick={applyDiscountCoupon}>
          Apply
        </button>
      </>
    )
  }

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };
  return (
    <div className="row container-fluid">
      <div className="col-md-6">
        <br />
        {addressForm()}
        <hr />
        <h4>Got Coupon?</h4>
        {showApplyCoupon()}
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>
      <div className="col-md-6">
        <div className='p-4 d-flex flex-column'>
          <h1 className='h4 font-weight-bold'>Order Summary</h1>
        </div>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>
        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable:₹ {totalAfterDiscount}
          </p>
        )}
        <hr />

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                disabled={!addressSave || !products.length}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (<>
              <button
                className="btn btn-primary mb-2"
                disabled={!addressSave || !products.length}
                onClick={() => navigate("/razorpayment")}
              >
                Place Order with Razor Payment
              </button>
              <button
                className="btn btn-primary"
                disabled={!addressSave || !products.length}
                onClick={() => navigate("/payment")}
              >
                Place Order with Stripe Payment
              </button>
            </>
            )}
          </div>

          <div className="col-md-6">
            <button className="btn btn-primary"
              type="button"
              disabled={products.length === 0}
              onClick={emptyCart}>Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
