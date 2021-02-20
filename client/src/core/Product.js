import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Menu from "./Menu";

import Card from "./Card";
import Product1 from "./Product1";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products by its category
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    // <Layout
    //     title={product && product.name}
    //     description=''
    //     className="container-fluid"
    // >
    <div>
      <Menu />
      <br />
      <div className="row">
        <div className="col-9 marginTop:u-2">
          {product && product.description && (
            <Product1 product={product} showViewProductButton={false} />
          )}
        </div>
      </div>

      <center>
        <h2>Related products</h2>
      </center> <br/>
      <div className="row">

                {relatedProduct.map((product, i) => (
                    <div key={i} className="col-md-3 col-sm-6 ">
                        <Card product={product} />
                    </div>
                ))}
            </div>

      {/* </Layout> */}
    </div>
  );
};

export default Product;
