import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts()]);

  return (
    <Layout title="Manage Products" description="" className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h2 className="text-left">Total {products.length} products</h2>
          <hr />
          <ul className="list-group manage">
            {products.map((p, i) => (
              <li key={i} className="list-group-item">
                <span className="mang">{p.name}</span>

                <Link to="/admin/products">
                  <button
                    type="button"
                    class="btn btn-danger 
                btn-lg"
                    style={{ float: "right", marginLeft: "5px" }}
                    onClick={() => destroy(p._id)}
                  >
                    Delete
                  </button>
                </Link>
                <Link to={`/admin/product/update/${p._id}`}>
                  <button
                    type="button"
                    class="btn btn-warning btn-lg"
                    style={{ float: "right" }}
                  >
                    Update
                  </button>
                </Link>
                <br />
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
