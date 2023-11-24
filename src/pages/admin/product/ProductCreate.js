import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForms from "../../../components/forms/ProductCreateForms";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  brands: ["Amol", "Vdilal", "Havmore", "Amul"],
  brand: "",
}

const ProductCreate = () => {
  const user = useSelector((state) => state.user);
  const [subOptions, setSubOptions] = useState([]);
  const [showsubs, setShowsubs] = useState(false);
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(initialState);
  const loadCategories = () => {
    getCategories().then((res) => {
      setValues({ ...values, categories: res.data })
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    loadCategories()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title}"is created"`)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCatagoryChange = (e) => {
    setShowsubs(false);
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
      setShowsubs(true);
    });
  };

  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10 " >
          {loading ? (
            <div class="spinner-border text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <h4>Product Create</h4>
          )}
          <hr />
          <div >
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading} />
          </div>
          <ProductCreateForms handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showsubs={showsubs}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  )
}
export default ProductCreate