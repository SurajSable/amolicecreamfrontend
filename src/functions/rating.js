import React from "react";
import StarRating from "react-star-ratings";

export const showAverrage = (p) => {
  if (p && p.ratings) {
    let ratinArray = p && p.ratings
    let total = []
    let length = ratinArray.length
    ratinArray.map((r) => total.push(r.star))
    let totalReduced = total.reduce((p, n) => p + n, 0)
    let result = (totalReduced) / length

    return (
      <div className="text-center pt-1 mb-3">
        <span>
          <StarRating rating={result} starDimension="25px" starSpacing="2px" starRatedColor="red" editing={false} className="mb-3" />
        </span>
        <span className="mt-2"> ({p.ratings.length})</span>
      </div>
    )
  }

}