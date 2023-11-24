import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCategory } from "../../functions/category";
import { useSelector } from "react-redux";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = () => {
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const { slug } = useParams();
    const user = useSelector((state) => state.user)
    useEffect(() => {
        setLoading(true)
        if (user && user.token) {
            getCategory(slug, user.token)
                .then((res) => {
                    setCategory(res.data?.category)
                    setProducts(res.data.product)
                    setLoading(false)
                }).catch((error) => {
                    console.log("home get category data error", error)
                    setLoading(false)
                })
        }
    }, [user])

    return (
        <div className="container mt-5 pt-5">
            <div className="row">
                <div className="col">
                    {loading ? (<h4 className="text-center p-3 mt-5 mb-5 display-4 bg-secondary-subtle">
                        Loading...
                    </h4>) : (<h4 className="text-center p-3 mt-5 mb-5 display-4 bg-secondary-subtle">
                        {products.length} product in "{category.name}" category</h4>)}
                </div>
            </div>
            <div className="row">
                {products.map((p) => <div className="col" key={p._id}>
                    <ProductCard product={p} />
                </div>)}
            </div>
        </div>
    )
}
export default CategoryHome

