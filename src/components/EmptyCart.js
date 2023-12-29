import React from 'react'
import { NavLink } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className='p-6'>
      <img
        src="https://www.chandranscreation.com/images/empty-cart.jpg"
        alt="Empty Cart"
        style={{ width: '400px', height: '400px' }}
      />
      <h1 className=' text-base font-bold'>Look Like your cart is Empty !</h1>
      <div style={{ paddingLeft: "25%" }} className='mb-3'>   <NavLink to={'/'}><button className=' bg-primary text-white ps-8 rounded pe-2'>Shop Now</button></NavLink>
      </div>
    </div>
  )
}

export default EmptyCart
