import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart,removeItem } from './cartHelper';
import Card from './Card';
import Checkout from './Checkout';

import Product2 from './Product2'

const Cart = () => {
    const [items, setItems] = useState([]);
    
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div className="ml-5">
                <h2>My Cart :
                     {`${items.length}`} items</h2>
                <div className="mt-4">
                {items.map((product, i) => (
                    <Product2
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}</div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add, remove, checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
    <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
               
                <div className="col-6">
                <div className="mr-5 mar">
                    <h2 className="mb-3">Cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div></div>
        </Layout>
    );
};

export default Cart;
