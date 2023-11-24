import React,{ useState }  from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import icecreamd from "../../images/icecreamd.png";
import CardMedia from '@mui/material/CardMedia';
import ProductListItems from "./ProductListItems";
import BasicTabs from "../Tabs"
import RatingModal from "../modal/RatingModal";
import StarRatings from "react-star-ratings"
import { showAverrage } from "../../functions/rating";
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import { addToWishlist } from "../../functions/user";
import { toast } from "react-toastify";

const selectUserCartData = createSelector(
    state => state.user,
    state => state.cart,
    (user, cart) => ({ user, cart })
  );

const SingleProduct = ({ product,onStarClick,star}) => {
    const [tooltip,setTooltip]=useState("add to card")
    const dispatch = useDispatch();
    const { user, cart } = useSelector(selectUserCartData);
const navigate =useNavigate();
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

    const { title, images, description, _id,slug } = product;
    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token).then((res) => {
          toast.success("Added to wishlist");
          navigate("/user/wishlist");
        });
      };
    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (<Card><Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i) => <img src={i.uri} key={i.public_id} />)}
                </Carousel></Card>) : (<Card> <CardMedia
                    component="img"
                    alt=""
                    height="400px"
                    image={icecreamd}
                /></Card>
                )}
                <BasicTabs description={description} />
            </div>
            <div className="col-md-5">
                <Card>
                        <h1 className="bg-info p-3"> {title}</h1>
                        {product && product.ratings && product.ratings.length > 0 
                        ? showAverrage(product) :  
                        <div className="text-center pt-1 pb-3">No rating yet</div> }
                        <ProductListItems product={product} />
                              <CardActions className="d-flex justify-content-around bg-body-secondary">
     <Tooltip title={tooltip}  placement="top">
    <span onClick={handleAddToCart}>  < div className="text-primary"
       ><ShoppingCartIcon />Add To Cart</div></span>
      </Tooltip>
                            <Link to="/">
                            </Link>
                            <span onClick={handleAddToWishlist}>
              <FavoriteBorderIcon className="text-info col-6 text-danger ms-4" /> <br /> Add to Wishlist
            </span>
                            <RatingModal>
                            <StarRatings
                                 name={_id}
                                 numberOfStars={5}
                                 rating={star}
                                 changeRating={onStarClick}
                                 isSelectable={true}
                                 starRatedColor="red"
                            />
                             </RatingModal>
                        </CardActions>
                </Card>
            </div>
        </>
    )
}

export default SingleProduct;