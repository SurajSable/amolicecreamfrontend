import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    updateCategory,
    getCategory,
} from "../../../functions/category";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate()
    const { slug } = useParams()
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        loadCategory()
    }, [])

    const loadCategory = () => {
        getCategory(slug, user.token).then((res) => {
            setName(res.data.name)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        updateCategory(slug, { name }, user.token)
            .then((res) => {
                toast.success(`"${res.data.name}" is updated`)
                setLoading(false)
                setName("")
                navigate("/admin/category")
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    return (<div className="container-fluid mt-5 pt-5">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                {loading ? (<h4>Loading..</h4>)
                    :
                    (<h4>update Category</h4>)}

                <CategoryForm
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName} />
                <hr />
            </div>
        </div>
    </div>
    )
};

export default CategoryUpdate;