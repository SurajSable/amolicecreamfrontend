import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { getSub, updateSub, } from "../../../functions/sub";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState([])
    const navigate = useNavigate()
    const { slug } = useParams()
    const loadCategories = () => {
        getCategories().then((res) => {
            setCategories(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const loadSub = () => {
        getSub(slug, user.token).then((res) => {
            setName(res.data.name)
            setParent(res.data.parent)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.length < 2) {
            toast.error(`SubCategory name  is too short.`)
        } else {
            setLoading(true)
            updateSub(slug, { name, parent }, user.token)
                .then((res) => {
                    toast.success(`"${res.data.name}" is updated`)
                    setLoading(false)
                    setName("")
                    navigate("/admin/sub")
                }).catch((err) => {
                    console.log(err)
                    toast.error(`category creation failed-${err}`)
                    setLoading(false)
                })
        }
    }

    return (
        <div className="container-fluid mt-5 pt-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4>Loading..</h4>)
                        :
                        (<h4>Create update Sub Category</h4>)}
                    <div className="form-group">
                        <label className="mb-2 mt-2 ">Parent category</label>
                        <select
                            name="category"
                            className="form-control form-select"
                            onChange={(e) => setParent(e.target.value)}
                            disabled={true}
                        >
                            <option>Please select</option>
                            {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id} selected={c._id === parent}> {c.name}</option>
                            ))}
                        </select>
                    </div>
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
export default SubUpdate;