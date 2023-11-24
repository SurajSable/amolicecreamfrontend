import React from "react";
import MultiSelectDropdown from "../MultipleSelectedDop";

const ProductCreateForms = ({handleChange,handleSubmit,values,handleCatagoryChange,subOptions,showsubs ,setValues})=>{
    const {
        title,
        description,
        price,
        categories,
        quantity,
        brands,
    }= values
    
    return(
        <form onSubmit={handleSubmit}>
        <div className="form-group pb-3">
            <label ><h6>Title</h6></label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group pb-3">
            <label><h6>Description</h6></label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group pb-3">
            <label><h6>Price</h6></label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group pb-3">
            <label><h6>Shipping</h6></label>
            <select
              name="shipping"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div className="form-group pb-3">
            <label><h6>Quantity</h6></label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              value={quantity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group pb-3" >
            <label><h6>Brand</h6></label>
            <select
              name="brand"
              className="form-control"
              onChange={handleChange}
            >
              <option>Please select</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group pb-3">

<label className="mb-2 mt-2 "><h6> Category</h6></label>
<select
  name="category"
  className="form-control"
  onChange={handleCatagoryChange}
>
  <option >Please select</option>
  {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}> {c.name}
      </option>
    ))}
</select>
</div>
<MultiSelectDropdown className="pb-3" showsubs={showsubs} subOptions= {subOptions} values={values} setValues={setValues}/>
          <button   className="btn btn-outline-primary rounded-pill text-center"
          style={{ width: '100%' }}>Save</button>
        </form>
     )
}
export default ProductCreateForms