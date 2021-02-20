import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link ,Redirect} from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        setError("");
        setName(e.target.value);
        setSuccess(false);

    };

    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category name- category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
               
            }
        });
    };

    const redirectUser = () => {
        if (success) {
          if (!error) {
            return <Redirect to="/create/product" />;
          }
        }
      };


    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text"><span style={{fontSize:"20px"}}>Name</span></label>
                <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={name}
                    autoFocus
                    required
                />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">Category should be unique</h3>;
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-danger">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout
            title="Add a new category"
            description={`Hello ${user.name}, ready to add a new category?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2 ml-5">
                    {showSuccess()}
                    {showError()}
                    {newCategoryFom()}
                    {goBack()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;
