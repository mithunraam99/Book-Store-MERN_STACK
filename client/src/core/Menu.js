import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelper";
import $ from "jquery";
import "../nav.scss";
import {Button} from 'react-bootstrap'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#00adcc" };
  } else {
    return { color: "#ffffff" };
  }
};

// $(function () {
//   var str = "#len"; //increment by 1 up to 1-nelemnts
//   $(document).ready(function () {
//     var i, stop;
//     i = 1;
//     stop = 7; //num elements
//     setInterval(function () {
//       if (i > stop) {
//         return;
//       }
//       $("#len" + i++).toggleClass("bounce");
//     }, 500);
//   });
// });

const Menu = ({ history }) => (
  <div>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <Link
        className="navbar-brand hoverable"
        id="len1"
        style={isActive(history, "/")}
        to="/"
      >
        <i className="fas fa-dumpster-fire fa-lg"></i>
      </Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-2">
            <Link
              className="nav-link hoverable"
              id="len2"
              style={isActive(history, "/shop")}
              to="/shop"
            >
              <i className="fas fa-book pr-2"> </i><span className="coll">Shop</span>
            </Link>
          </li>

          <li className="nav-item mr-2 ">
            <Link
              className="nav-link hoverable"
              id="len3"
              style={isActive(history, "/cart")}
              to="/cart"
            >
              <i className="fas fa-cart-plus"></i>{" "}
              <sup>
                <small className="cart-badge">{itemTotal()}</small>
              </sup>
            </Link>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item mr-2">
              <Link
                className="nav-link hoverable"
                id="len4"
                style={isActive(history, "/user/dashboard")}
                to="/user/dashboard"
              >
                <i className="fas fa-user pr-2"></i>
                Dashboard
              </Link>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item mr-2">
              <Link
                className="nav-link hoverable"
                id="len4"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard"
              >
                <i className="fas fa-user pr-2"></i>
                <span className="coll">Dashboard</span>
              </Link>
            </li>
          )}

          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item mr-2">
                <Link
                  className="nav-link hoverable"
                  id="len5"
                  style={isActive(history, "/signin")}
                  to="/signin"
                >
                  <i className="fas fa-sign-in-alt pr-2"></i>
                  <span className="coll">Signin</span>
                </Link>
              </li>

              <li className="nav-item mr-2">
                <Link
                  className="nav-link hoverable"
                  id="len6"
                  style={isActive(history, "/signup")}
                  to="/signup"
                >
                  <i class="fa fa-sign-out pr-2" aria-hidden="true">
</i>
                  <span className="coll">Signup</span>
                </Link>
              </li>
            </Fragment>
          )}

          {isAuthenticated() && (
            <li className="nav-item ">
              <span
                className="nav-link hoverable"
                id="len7"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
              ><span className="coll">
                <i className="fas fa-sign-out-alt pr-2"></i>
                Signout</span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  </div>
);

export default withRouter(Menu);
