import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelper";

const Product1 = ({
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
        <h4 className="card-p  mt-2">Description : {" "}<span style={{fontSize:"16px"}}>{product.description.substring(0, 1000)}{" "}</span>
          
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
      return <Redirect to={`/product/${product._id}`} />;
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
        <div>
          <div className="input-group mb-5 cardpurchase">
            <div className="input-group-prepend  ml-2 
            ">
              <span className="input-group-text "><strong>

             
                <span style={{fontSize:"15px"}} >Adjust Quantity</span> </strong>
              </span>
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
    <React.Fragment>
      <div className="clearfix mr-5">
        <div className="overflow">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" picture={true} />
        </div>
      </div>

      <div className="content ">
        <h4 className="card-title">
          <span style={{ fontSize: "45px" }}>{product.name} </span>
        </h4>

        <p className="black-10">Price: <span style={{color:"red",fontSize:"25px"}}> ₹ {product.price}</span></p>
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
      {showDescription(showViewProductButton)}
    </React.Fragment>
  );
};

export default Product1;
