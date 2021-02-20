import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
      //TimeStamp
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Mern Stack Ecommerce Website"
            description="Buy your favorite Book from Here"
            className="container-fluid"
        >
           
           <Search /> <br/>
            <h2 className="mb-4 arrival">New Arrivals</h2>
  
            <div className="row">

                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-md-3 col-sm-6 ">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-4 arrival">Best Sellers</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                     <div key={i} className="col-md-3 col-sm-6">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
