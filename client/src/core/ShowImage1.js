import React from "react";
import { API } from "../config";
import { Link } from "react-router-dom";

const ShowImage1 = ({ item, url }) => {





const pictureButton2 = (picture) => {
    return(
      
            <div className="product-img ">
              <center>
                <Link to={`/product/${item._id}`}>
                  <img
                    src={`${API}/${url}/photo/${item._id}`}
                    alt={item.name}
                    className="mb-3 imgg"
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      height: "150px",
                      width: "150",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </center>
             
            </div>
    
     
      )};


    
  return (
      <React.Fragment>
          {pictureButton2()}
  
    
      </React.Fragment>
    
    );
};

export default ShowImage1;
