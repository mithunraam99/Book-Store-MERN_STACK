import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage1 from "./ShowImage1";
import { addItem, updateItem, removeItem } from "./cartHelper";

const Product2 = ({
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
          <button className="btn btn-outline-primary btn-sm mb-2 ">
            View Product
          </button>
        </Link>
      )
    );
  };

  const showDescription = (showViewProductButton) => {
    return (
      !showViewProductButton && (
        <h4 className="card-p  mt-2">
          {" "}
          Description : {product.description.substring(0, 1000)}{" "}
        </h4>
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
      return <Redirect to="/" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-danger mt-2 mb-2 card-btn-1 cart"
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
        <div >
          <div className="input-group mb-5 cardpurchase ">
            <div
              className="input-group-prepend ml-2 cardpurchase 
            "
            >
              <span className="input-group-text cardpurchase1 ">
                <strong>
                  <span style={{ fontSize: "15px" }}>Adjust Quantity</span>{" "}
                </strong>
              </span>
            </div>
            <input
              type="number"
              className="form-control adjj"
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
          className="btn btn-outline-danger mb-2 btn-sm "
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <React.Fragment>
      <div className="clearfix mr-5">
        <div className="overflow">
          {shouldRedirect(redirect)}
          <ShowImage1 item={product} url="product" />
        </div>
      </div>

      <div className="content ">
        <h4 className="card-title">
          <span style={{ fontSize: "20px" }}>{product.name} </span>
        </h4>

        <p className="cat">
          Price:{" "}
          <span className="" style={{ color: "red", fontSize: "15px" }}>
            {" "}
            ₹ {product.price}
          </span>
        </p>
        {/* <p className="black-9">
          <span className="cat">Category: </span>
          <span className="catt">
            {product.category && product.category.name}
          </span>
        </p> */}
        {/* {showStock(product.quantity)} */}
        <br />

        {showViewButton(showViewProductButton)}

        {/* {showAddToCart(showAddToCartButton)} */}

        {showRemoveButton(showRemoveProductButton)}
        {""}
        {showCartUpdateOptions(cartUpdate)}
      </div><br/>
      {/* {showDescription(showViewProductButton)} */}
    </React.Fragment>
  );
};

export default Product2;
