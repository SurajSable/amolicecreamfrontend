import axios from 'axios';

export const userCart = async (cart, authtoken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/user/cart`,
      { cart },
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.log("userCart error", error);
    throw error; // Re-throw the error to be caught by the caller if needed
  }
};

export const getUserCart = async (authtoken) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/user/cart`,
      {
        headers: {
          authtoken,
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    console.log("getuserCart error", error);
    throw error; // Re-throw the error to be caught by the caller if needed
  }
};

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveAddress = async (address, authtoken) => {
  try {
    const response1 = await axios.post(
      `${process.env.REACT_APP_API}/user/address`,
      { address },
      {
        headers: {
          authtoken,
        },
      }
    );
    return response1.data; // Return the response data
  } catch (error) {
    console.log("saveAddress error", error);
    throw error; // Re-throw the error to be caught by the caller if needed
  }
};

export const applyCoupon = async (coupon, authtoken) => {
  try {
    const response1 = await axios.post(
      `${process.env.REACT_APP_API}/user/cart/coupon`,
      { coupon },
      {
        headers: {
          authtoken,
        },
      }
    );
    return response1.data; // Return the response data
  } catch (error) {
    console.log("applycoupon error", error);
    throw error; // Re-throw the error to be caught by the caller if needed
  }
};

export const createOrder = async (stripeResponse, authtoken) => {
  try {
    const response1 = await axios.post(
      `${process.env.REACT_APP_API}/user/order`,
      { stripeResponse },
      {
        headers: {
          authtoken,
        },
      }
    );
    return response1.data; // Return the response data
  } catch (error) {
    console.log("createOrder error", error);
    throw error; // Re-throw the error to be caught by the caller if needed
  }
}

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      authtoken,
    },
  });

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
