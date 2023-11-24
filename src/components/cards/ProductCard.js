import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import icecreamd from "../../images/icecreamd.png";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CardActions from '@mui/material/CardActions';
import { Link } from "react-router-dom";
import { showAverrage } from "../../functions/rating";
import _ from "lodash";
import Tooltip from '@mui/material/Tooltip';
import {  useDispatch } from "react-redux";
// import { createSelector } from 'reselect';

// const selectUserCartData = createSelector(
//   state => state.user,
//   state => state.cart,
//   (user, cart) => ({ user, cart })
// );

const ProductCard=({product})=>{
  //console.log("product",product.quantity  )
  const [tooltip,setTooltip]=useState("add to card")
    // redux
 
  const dispatch = useDispatch();
  const handleAddToCart= ()=>{
       // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
       //console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
 // show tooltip
 setTooltip("Added");

 // add to reeux state
 dispatch({
  type: "ADD_TO_CART",
  payload: unique,
});
// show cart items in side drawer
dispatch({
  type: "SET_VISIBLE",
  payload: true,
});
    }
    } 
    const {title,description,images,slug}=product;
    //console.log("product",product)
return(
    <div>
      
        <Card sx={{ maxWidth: 345 }}  style={{boxShadow: "3px 7px 10px 0px", borderRadius:"7%"}}>
        {product && product.ratings && product.ratings.length > 0 
                        ? showAverrage(product) :  
                        <div className="text-center pt-1 pb-3">No rating yet</div> }
  <CardMedia
        component="img"
        alt=""
        height="140"
        image={images && images.length ? images[0].uri : icecreamd}
      />
         <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${description && description.substring(0, 40)}...`}
        </Typography>
      </CardContent>
      
      <CardActions className="d-flex justify-content-around bg-body-secondary">
    <Link to={`/product/${slug}`}><div> <RemoveRedEyeIcon className="text-primary"/> View Product </div></Link>
    
     <Tooltip title={tooltip}  placement="top">
     <span >
      <button  className="btn btn-link" onClick={handleAddToCart} disabled={product.quantity < 1}  > 
     <ShoppingCartIcon className="text-primary" />
        {product.quantity< 1 ? "Out of stock" : "Add to Cart"}
        </button>
        </span>
      </Tooltip>
  
      </CardActions>
        </Card>
    
    </div>
    
)
}
 export default ProductCard