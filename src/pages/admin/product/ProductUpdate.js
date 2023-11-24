import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../../functions/product";
import ProductUpdateForms from "../../../components/forms/ProductUpdateForm";
import { updateProduct } from "../../../functions/product";

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    brands: ["Amol", "Vdilal", "Havmore", "Amul"],
    brand: "",
}
const ProductUpdate = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [values, setValues] = useState(initialState)
    const [categories, setCategories] = useState([])
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false)
    const { slug } = useParams()

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then((p) => {
                setValues({ ...values, ...p.data });
                getCategorySubs(p.data.category._id).then((res) => {
                    setSubOptions(res.data); // on first load, show default subs
                });
                // 3 prepare array of sub ids to show as default sub values in antd Select
                let arr = [];
                p.data.subs.map((s) => {
                    arr.push(s._id);
                });
                setArrayOfSubs((prev) => arr); // required for ant design select to work
            }).catch((err) => {
                console.log(err)
            })
    }

    const loadCategories = () => {
        getCategories().then((c) => {
            setCategories(c.data);
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        values.subs = arrayOfSubs
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(`"${res.data.title}" is updated`);
                navigate("/admin/products")
            }).catch((err) => {
                console.log("update product faild", err)
                setLoading(false)
                toast.error(err.response.data.err);
            })
    }

    const handleCatagoryChange = (e) => {
        e.preventDefault();
        setSelectedCategory(e.target.value)
        getCategorySubs(e.target.value).then((res) => {
            setSubOptions(res.data);
        });
        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        // clear old sub category ids
        setArrayOfSubs([]);
    };

    return (
        <div className="container-fluid mt-5 pt-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    {loading ? (
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <h4>Product update</h4>
                    )}
                    {/* {JSON.stringify(values)} */}
                    <hr />
                    <div className="">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading} />
                    </div>
                    <hr />
                    <ProductUpdateForms
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        handleSubmit={handleSubmit}
                        handleCatagoryChange={handleCatagoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}
export default ProductUpdate