import axios from "axios"

export const getCoupuns = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/coupons`)
}

export const removeCoupuns = async (couponId, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/coupon/${couponId}`,
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const createCoupuns = async (coupon, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/coupon`, { coupon },
    {
      headers: {
        authtoken,
      },
    })
}