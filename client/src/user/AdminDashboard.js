import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card cardh ">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
            <center>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
            <span style={{fontSize:"22px"}}> Create Category</span>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
            <span style={{fontSize:"22px"}}> Create Product</span>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
            <span style={{fontSize:"22px"}}> View Orders</span>
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
            <span style={{fontSize:"22px"}}> Manage Products</span>
            </Link>
          </li></center>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card cardw ">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item"><span style={{fontSize:"25px"}}>Name: </span><span style={{fontSize:"22px"}}>{name}</span></li>
          <li className="list-group-item"><span style={{fontSize:"25px"}}>Email: </span> <span style={{fontSize:"22px"}}>{email}</span></li>
          {/* <li className="list-group-item"><span style={{fontSize:"20px"}}>
            {role === 1 ? "ADMIN" : "Registered User"}</span>
          </li> */}
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
