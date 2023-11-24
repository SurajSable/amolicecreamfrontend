import React from "react";


const ProductUpdateForms = ({ handleChange, handleSubmit, values, setValues, handleCatagoryChange, categories, subOptions, arrayOfSubs, setArrayOfSubs, selectedCategory }) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values
  const handleSelectChange = (event) => {
    if (event.target.checked) {
      setArrayOfSubs([...new Set([...arrayOfSubs, event.target.value])])
    } else {
      setArrayOfSubs(arrayOfSubs.filter(id => id !== event.target.value))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group pb-3">
        <label><h6>Title</h6></label>
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
          value={shipping === 'Yes' ? "Yes" : "No"}
        >

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


      <div className="form-group pb-3">
        <label><h6>Brand</h6></label>
        <select
          name="brand"
          className="form-control form-select"
          onChange={handleChange}
          value={brand}
        >
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
          className="form-control form-select"
          onChange={handleCatagoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          {categories.length > 0 && categories.map((c) => (<option key={c._id} value={c._id}> {c.name}
          </option>
          ))}
        </select>
      </div>
      <h6>Sub Categories</h6>
      <div className="mb-2 mt-2 pb-3">
        {subOptions.length &&
          subOptions.map(s => <span key={s._id}> <input
            type="checkbox"
            name={s.name}
            value={s._id}
            checked={arrayOfSubs.includes(s._id)}
            onChange={handleSelectChange}
          />
            <label htmlFor={s.name} className="me-2"> {s.name}</label></span>)}
      </div>
      <button className="btn btn-outline-primary rounded-pill text-center"
        style={{ width: '100%' }}>Upadate Product</button>
    </form>
  )
}
export default ProductUpdateForms