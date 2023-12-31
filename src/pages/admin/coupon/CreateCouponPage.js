import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { getCoupuns, removeCoupuns, createCoupuns } from '../../../functions/coupon';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const CreateCouponPage = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("")
  const [expiry, setExpiry] = useState("")
  const [discount, setDiscount] = useState("")
  const [loading, setLoading] = useState("")
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    loadAllCoupons()
  }, [])

  const loadAllCoupons = () => getCoupuns().then((res) => setCoupons(res.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupuns({ name, expiry, discount }, user.token)
      .then((res) => {
        loadAllCoupons();
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) =>
        console.log("create coupon err", err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeCoupuns(couponId, user.token)
        .then((res) => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group m-2">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>
            <div className="form-group m-2">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group m-3">
              <label className="text-muted m-1">Expiry Date</label>
              <br />
              <DatePicker
                className='form-control'
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
                required />
            </div>
            <button className="btn btn-outline-primary rounded-pill text-center"
              style={{ width: '100%' }}>Save</button>
          </form>
          <br />
          <h4>{coupons.length} Coupons</h4>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlinedIcon
                      onClick={() => handleRemove(c._id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default CreateCouponPage;