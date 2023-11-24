import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav className="btn-group">
    <ul className="nav flex-column">
      <li className="nav-item my-li" >
        <Link to="/admin/dashboard" className="nav-link">
          DASHBOARD
        </Link>
      </li>

      <li className="nav-item my-li">
        <Link to="/admin/product" className="nav-link">
          PRODUCT
        </Link>
      </li>

      <li className="nav-item my-li">
        <Link to="/admin/products" className="nav-link">
          PRODUCTS
        </Link>
      </li>

      <li className="nav-item my-li">
        <Link to="/admin/category" className="nav-link">
          CATEGORY
        </Link>
      </li>

      <li className="nav-item my-li">
        <Link to="/admin/sub" className="nav-link">
          SUB CATEGORY

        </Link>
      </li>

      <li className="nav-item my-li">
        <Link to="/admin/coupon" className="nav-link">
          COUPON
        </Link>
      </li>

      <li className="nav-item my-li">
        <Link to="/user/password" className="nav-link">
          PASSWORD
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
