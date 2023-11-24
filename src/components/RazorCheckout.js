import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { paymentCheckout, createPaymentIntent, getRazorKey } from '../functions/payment';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import icecreamd from "../images/icecreamd.png"
import { createOrder } from '../functions/user';
import { emptyUserCart } from '../functions/user';
import { Button } from '@mui/material';

const RazorCheckout = () => {
  const coupon = useSelector(state => state.coupon)
  const user = useSelector(state => state.user)
  const [cartTotal, setCartTotal] = useState(0);
  const [payable, setPayable] = useState(0);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      setCartTotal(res.data.cartTotal);
      setPayable(res.data.payable);
    });
  }, [coupon, user.token]);
  const checkoutHandler = async (amount) => {
    const { data: { key } } = await getRazorKey(user.token)
    const { data: { order } } = await paymentCheckout(user.token, amount)
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Amol Ice-cream",
      description: "product-Ice-cream,milk product,dairy product,soda",
      image: "https://res.cloudinary.com/deboga6f2/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1699083219/Ankitsakharephoto_c3wkft.jpg",
      order_id: order.id,
      handler: function (response) {
        // Handle the success event
        alert('Payment successful: ' + response.razorpay_payment_id);
        // empty cart from local storage
        const payload = {
          "paymentIntent": {
            "id": response.razorpay_payment_id,
            "amount": order.amount,
            "currency": "INR",
            "payment_method_types": ["razorpay"],
            "status": "succeeded",
            "razor_date": new Date().toLocaleString(),
          }
        }
        createOrder(payload, user.token).then((res) => {
          if (res.ok) {
            if (typeof window !== "undefined") localStorage.removeItem("cart")
            // empty cart from redux
            dispatch({
              type: "ADD_TO_CART",
              payload: [],
            });
            // reset coupon to false
            dispatch({
              type: "COUPON_APPLIED",
              payload: false,
            });
            // empty cart from database
            emptyUserCart(user.token);
            navigate("/user/history")
          }
        })
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: ""
      },
      notes: {
        "address": "4,Shivaji nagar,Limbayat,Surat,Gujrat"
      },
      theme: {
        "color": "##3891F7"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <>
      <div className="text-center pb-5">
        <Card>
          <img
            src={icecreamd}
            style={{
              height: "200px",
              objectFit: "cover",
              marginBottom: "-50px",
            }}
            alt='ice cream'
          />
          <div className='d-flex  justify-content-between mb-4'>
            <div>
              < CurrencyRupeeIcon className="text-info" />  <br />
              Total:   ₹  {cartTotal}
            </div>
            <div>
              < DoneAllIcon className="text-info" /> <br />
              Total payable : ₹ {(payable / 100).toFixed(2)}
            </div>
          </div>
        </Card>
      </div>
      <Button className='bg-primary text-white' onClick={() => checkoutHandler(((payable / 100).toFixed(2)))}>Checkout razorpay</Button>
    </>
  )
}

export default RazorCheckout