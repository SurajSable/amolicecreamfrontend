import React from "react";

const CategoryForm = ({ handleSubmit, name, setName }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="mb-2"><h6>Name</h6></label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required />
                <br />
                <div className="d-grid gap-2 ">
                    <button className=" btn btn-outline-primary rounded-pill">Save</button>
                </div>
            </div>
        </form>
    )
}
export default CategoryForm;