import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/cards/SingleProduct";
import { useSelector } from "react-redux";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product = () => {
  const user = useSelector((state) => state.user)
  const [product, setProduct] = useState({})
  const [related, setRelated] = useState([])
  const [star, setStar] = useState(0)
  const { slug } = useParams()

  useEffect(() => {
    try {
      if (product && product.ratings && user && user.token) {
        let existingRatingObject = product.ratings.find(
          (ele) => ele.postedBy.toString() === user.id.toString());
        if (existingRatingObject) {
          setStar(existingRatingObject.star);
        }
      }
    } catch (error) {
      console.error("Error in rating update:", error);
    }
  }, [product.ratings, user])

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      // load related
      getRelated(res.data._id).then((res) => setRelated(res.data));
      setProduct(res.data);
    }).catch((err) => console.log("related error", err))
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating)
    productStar(name, newRating, user.token).then((res) => {
      loadSingleProduct(); // if you want to show updated rating in real time
    })
      .catch((err) => console.log(err, "onstarclick error"))
  }

  return <div>
    <div className="container-fluid mt-5 pt-5">
      <div className="row pt-4">
        <SingleProduct product={product} onStarClick={onStarClick} star={star} />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>Related Products</h4>
          <hr />
        </div>
      </div>
      <div className="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (<div className="text-center col">No Products Found</div>)}
      </div>
    </div>
  </div>;
}

export default Product; 