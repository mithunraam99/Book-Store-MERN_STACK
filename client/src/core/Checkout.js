import React, { useState, useEffect } from "react";
import {
    getProducts,
    getBraintreeClientToken,
    processPayment,
    createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelper";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
// import "braintree-web"; // not using this package

//The UI payment
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: "",
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
                setData({
                    ...data,
                    error: data.error,
                });
            } else {
                console.log(data);
                setData({
                    clientToken: data.clientToken,
                });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const handleAddress = (event) => {
        setData({
            ...data,
            address: event.target.value,
        });
    };

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticated() ? ( <
            div > { showDropIn() } < /div>
        ) : ( <
            Link to = "/signin" >
            <
            button className = "btn btn-primary" > Sign in to checkout < /button>{" "} <
            /Link>
        );
    };

    let deliveryAddress = data.address;

    const buy = () => {
        setData({
            loading: true,
        });
        //nonce->payment method
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then((data) => {
                // console.log(data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                // console.log(
                //     "send nonce and total to process: ",
                //     nonce,
                //     getTotal(products)
                // );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products),
                };

                processPayment(userId, token, paymentData)
                    .then((response) => {
                        console.log(response);

                        // create order
                        // empty cart
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress,
                        };

                        createOrder(userId, token, createOrderData)
                            .then((response) => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log("payment success and empty cart");
                                    setData({
                                        loading: false,
                                        success: true,
                                    });
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                                setData({
                                    loading: false,
                                });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        setData({
                            loading: false,
                        });
                    });
            })
            .catch((error) => {
                // console.log("dropin error: ", error);
                setData({
                    ...data,
                    error: error.message,
                });
            });
    };

    const showDropIn = () => ( <
        div onBlur = {
            () =>
            setData({
                ...data,
                error: "",
            })
        } >
        { " " } {
            data.clientToken !== null && products.length > 0 ? ( <
                div >
                <
                div className = "gorm-group mb-3 mt-3" > { " " } { /* <form class="card p-2"> */ } { " " } <
                div class = "input-group" >
                <
                input type = "text"
                class = "form-control"
                placeholder = "Promo code" /
                >
                <
                div class = "input-group-append" >
                <
                button class = "btn btn-secondary" > Redeem < /button>{" "} <
                /div>{" "} <
                /div>{" "} { /* </form> */ } { " " } <
                div className = "mt-3" >
                <
                label
                for = "email"
                style = {
                    {
                        fontSize: "20px",
                    }
                } >
                { " " }
                Email { " " } <
                /label>{" "} <
                input type = "email"
                class = "form-control"
                id = "email"
                placeholder = "you@example.com" /
                >
                <
                /div>{" "} <
                div className = "mt-3" >
                <
                label className = "text"
                style = {
                    {
                        fontSize: "20px",
                    }
                } >
                { " " }
                Delivery address: { " " } <
                /label>{" "} <
                textarea onChange = { handleAddress }
                className = "form-control"
                value = { data.address }
                placeholder = "Type your delivery address here..." /
                >
                <
                /div>{" "} <
                /div>{" "} <
                DropIn options = {
                    {
                        authorization: data.clientToken,
                        //for paypal
                        paypal: {
                            flow: "vault",
                        },
                    }
                }
                onInstance = {
                    (instance) => (data.instance = instance) }
                />{" "} <
                button onClick = { buy }
                className = "btn btn-success btn-block" >
                Pay { " " } <
                /button>{" "} <
                /div>
            ) : null
        } { " " } <
        /div>
    );

    const showError = (error) => ( <
        div className = "alert alert-danger"
        style = {
            {
                display: error ? "" : "none",
            }
        } >
        { " " } { error } { " " } <
        /div>
    );

    const showSuccess = (success) => ( <
        div className = "alert alert-info"
        style = {
            {
                display: success ? "" : "none",
            }
        } >
        Thank You!Your payment was successful!
        <
        /div>
    );

    const showLoading = (loading) =>
        loading && < h2 className = "text-danger" > Loading... < /h2>;

    return ( <
        div >
        <
        h2 > Total: ₹{ getTotal() } < /h2>{" "} <
        p > Card Number: "4111 1111 1111 1111" < /p> {showLoading(data.loading)}{" "} { showSuccess(data.success) } { showError(data.error) } { showCheckout() } { " " } <
        /div>
    );
};

export default Checkout;