// import { REACT_APP_API_URL } from "../config";
import queryString from "query-string";
require('dotenv').config();

export const getProducts = sortBy => {
    return fetch(`${REACT_APP_API_URL}/products?sortBy=${sortBy}&order=desc&limit=6`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//Get Categories
export const getCategories = () => {
    return fetch(`${REACT_APP_API_URL}/categories`, {
            method: "GET",
        })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

//filter by category , prece range to backend
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${REACT_APP_API_URL}/products/by/search`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

//search
export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`${REACT_APP_API_URL}/products/search?${query}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//read Product_id
export const read = productId => {
    return fetch(`${REACT_APP_API_URL}/product/${productId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


//Related Products in Category
export const listRelated = productId => {
    return fetch(`${REACT_APP_API_URL}/products/related/${productId}`, {
            method: "GET"
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//request to braintree backend get token 
export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${REACT_APP_API_URL}/braintree/getToken/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

//payment
export const processPayment = (userId, token, paymentData) => {
    return fetch(`${REACT_APP_API_URL}/braintree/payment/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${REACT_APP_API_URL}/order/create/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ order: createOrderData })
        })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};