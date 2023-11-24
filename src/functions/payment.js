import axios from "axios";

export const paymentCheckout = (authtoken, amount) =>
  axios.post(
    `${process.env.REACT_APP_API}/paymentcheckout`,
    { amount },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent-razor`,
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getRazorKey = (authtoken) =>
  axios.get(
    `${process.env.REACT_APP_API}/getrazorkey`,
    {
      headers: {
        authtoken,
      },
    }
  );