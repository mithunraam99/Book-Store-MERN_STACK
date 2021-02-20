import React from "react";
import { API } from "../config";
import { Link } from "react-router-dom";

const ShowImage = ({ item, url, picture = false }) => {



    const pictureButton1 = (picture) => {
        return (
            picture && ( <
                div className = "product-img imgp ml-3" >

                <
                Link to = { `/product/${item._id}` } >
                <
                img src = { `${API}/${url}/photo/${item._id}` }
                alt = { item.name }
                className = "mb-3 imgg1"
                style = {
                    {
                        maxHeight: "100%",
                        maxWidth: "100%",
                        height: "480px",
                        width: "370",
                        // objectFit: "cover",
                    }
                }
                /> <
                /Link>

                <
                /div>
            )
        );

    };

    const pictureButton2 = (picture) => {
        return (!picture && ( <
                div className = "product-img ml-3" >
                <
                center >
                <
                Link to = { `/product/${item._id}` } >
                <
                img src = { `${API}/${url}/photo/${item._id}` }
                alt = { item.name }
                className = "mb-3 imgg"
                style = {
                    {
                        maxHeight: "100%",
                        maxWidth: "100%",
                        height: "250px",
                        width: "150",
                        objectFit: "cover",
                    }
                }
                /> <
                /Link> <
                /center>

                <
                /div>
            )

        )
    };



    return ( <
        React.Fragment > { pictureButton2(picture) } { pictureButton1(picture) }

        <
        /React.Fragment>

    );
};

export default ShowImage;