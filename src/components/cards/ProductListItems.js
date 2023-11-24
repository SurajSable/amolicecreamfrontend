import React from "react";
import { Link } from "react-router-dom";
const ProductListItems = ({ product }) => {
  const { price,
    category,
    subs,
    shipping,
    brand,
    quantity,
    sold, } = product
  return (
    <ul className="list-group  d-flex justify-content-between ">
      <li className="list-group-item d-flex justify-content-between">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right  ">
          <b>₹ {price} </b>
        </span>
      </li>
      {category && (
        <li className="list-group-item d-flex justify-content-between">
          Category{" "}
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right  "
          >
            {category.name}
          </Link>
        </li>
      )}
      {subs && (
        <li className="list-group-item  d-flex justify-content-between">
          Sub Categories
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/sub/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              {s.name}
            </Link>
          ))}
        </li>
      )}
      <li className="list-group-item  d-flex justify-content-between">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item  d-flex justify-content-between">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
      <li className="list-group-item  d-flex justify-content-between">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item  d-flex justify-content-between">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  )
}

export default ProductListItems;