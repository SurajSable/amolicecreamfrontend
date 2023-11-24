import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
    createSub,
    getSubs,
    removeSub,
} from "../../../functions/sub";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [Subs, setSubs] = useState([])

    const loadCategories = () => {
        getCategories().then((res) => {
            setCategories(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const loadSubs = () => {
        getSubs().then((res) => {
            setSubs(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        loadCategories()
        loadSubs()
    }, [])

    const handleRemove = (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeSub(slug, user.token)
                .then((res) => {
                    loadSubs()
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.length < 2) {
            toast.error(`Category name  is too short.`)
        } else {
            setLoading(true)
            createSub({ name, parent: category }, user.token)
                .then((res) => {
                    toast.success(`"${res.data.name}" is created`)
                    setLoading(false)
                    setName("")
                    loadSubs()
                }).catch((err) => {
                    console.log(err)
                    toast.error(`category creation failed-${err}`)
                    setLoading(false)
                })
        }
    }
    const searched = () => (cat) => cat.name.toLowerCase().includes(keyword.toLowerCase())
    return (
        <div className="container-fluid mt-5 pt-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4>Loading..</h4>)
                        :
                        (<h4>Create Sub Category</h4>)}
                    <div className="form-group">
                        <label className="mb-2 mt-2 "><h5>Parent category</h5></label>
                        <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option >Please select</option>
                            {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}> {c.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                    <hr />
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {Subs.filter(searched()).map((ele) => {
                        return <div className="alert alert-secondary" key={ele._id}>
                            {ele.name}
                            <span
                                onClick={() => handleRemove(ele.slug)}
                                className="btn btn-sm float-end"
                            > <DeleteIcon className="text-danger" /></span>
                            <Link to={`/admin/sub/${ele.slug}`}>
                                <span className="btn btn-sm float-end">
                                    <EditIcon className="text-primary" />
                                </span>
                            </Link>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
};
export default SubCreate;