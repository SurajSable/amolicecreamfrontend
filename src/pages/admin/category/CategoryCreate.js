import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createCategory,
    getCategories,
    removeCategory,
} from "../../../functions/category";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const user = useSelector((state) => state.user);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [keyword, setKeyword] = useState("");
    const loadCategories = () => {
        getCategories().then((res) => {
            setCategories(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        loadCategories()
    }, [])

    const handleRemove = (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    loadCategories()
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
            createCategory({ name }, user.token)
                .then((res) => {
                    toast.success(`"${res.data.name}" is created`)
                    setLoading(false)
                    setName("")
                    loadCategories()
                }).catch((err) => {
                    console.log(err)
                    toast.error(`category creation failed-${err}`)
                    setLoading(false)
                })
        }
    }
    const searchCategory = () => (cat) => cat.name.toLowerCase().includes(keyword.toLowerCase())

    return (
        <div className="container-fluid mt-5 pt-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (<h4>Loading..</h4>)
                        :
                        (<h4>Create Category</h4>)}
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName} />
                    <hr />
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    {categories.filter(searchCategory()).map((ele) => {
                        return <div className="alert alert-secondary" key={ele._id}>
                            {ele.name}
                            <span
                                onClick={() => handleRemove(ele.slug)}
                                className="btn btn-sm float-end"
                            > <DeleteIcon className="text-danger" /></span>
                            <Link to={`/admin/category/${ele.slug}`}>
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

export default CategoryCreate;