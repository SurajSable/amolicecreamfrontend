import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        getCategories()
            .then((res) => {
                setCategories(res.data)
                setLoading(false)
            })
            .catch((err) => console.log("c--", err))
    }, [])

    const showCategories = () => {
        return (
            <>
                {categories.map((c) => <div key={c._id}
                    className="col btn btn-lg btn-block m-3">
                    <Link to={`/category/${c.slug}`}>{c.name.toUpperCase()}</Link></div>)}
            </>
        )
    }
    return (
        <div className="container">
            <div className="row">
                {loading ? (<h4 className="text-center">Loading...</h4>) : showCategories()}
            </div>
        </div>
    )
}
export default CategoryList