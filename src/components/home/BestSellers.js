import React, { useState, useEffect } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCard from "../cards/LoadingCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BestSellers = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0)

    useEffect(() => {
        loadAllProducts()
    }, [page])

    useEffect(() => {
        getProductsCount()
            .then((res) => setProductsCount(res.data))
            .catch((err) => console.log("Products count", err))
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts("sold", "desc", page)
            .then((res) => {
                setProducts(res.data)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    return (<>
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    {loading ? <><LoadingCard count={3} /></> :
                        (<>
                            {products.map((p) => {
                                return (
                                    <div key={p._id} className="col-sm-12 col-md-6 col-lg-4 mb-3">
                                        <ProductCard product={p} />
                                    </div>
                                )
                            })}
                        </>)}</div>
                <div className="row">
                    <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(productsCount / 3)}
                                variant="outlined" shape="rounded"
                                onChange={(e, page) => setPage(page)} />
                        </Stack>
                    </nav>
                </div>
            </div>
        </div>
    </>
    )
}

export default BestSellers;