import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelper";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showDescription = (showViewProductButton) => {
    return (
      !showViewProductButton && (
        <p className="card-p  mt-2">
          {product.description.substring(0, 1000)}{" "}
        </p>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/shop" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1 cart"
        >
          Add to Cart
        </button> 
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary">Stock {quantity}</span>
    ) : (
      <span className="badge badge-primary">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return (
  
    <div className="card-text-center">
      <div className="overflow">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
      </div>

      <div className="card-body text-dark">
        <h4 className="card-title">
        <span style={{ fontSize: "25px" }}>{product.name} </span>
        </h4>

        {showDescription(showViewProductButton)}
        <p className="card-p black-10"><span style={{color:"red",fontSize:"25px"}}> ₹ {product.price}</span></p>
        <p className="black-9">
          <span className="cat">Category: </span>
          <span className="catt">
            {product.category && product.category.name}
          </span>
        </p>
        {showStock(product.quantity)}
        <br />

        {showViewButton(showViewProductButton)}

        {showAddToCart(showAddToCartButton)}

        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
