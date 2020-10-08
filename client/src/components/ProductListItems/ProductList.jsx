import React from "react";
import { Link } from "react-router-dom"
import './ProductSass.scss'

function ScheduleList({ product }) {
  
  return (
    <div className={"wrappe"}>
      <div className={"car"}>
        <img src={product.image} alt="Sports-Villa-Products" />
            <div className={"info"}>
                <h1>{product.productName}</h1>
                <p>₹ {product.price}</p>
                <Link to={`/productdetaill/${product._id}`}><button>Get Detail</button></Link>
            </div>
        </div>
    </div>
  );
}

export default ScheduleList;
