import React from "react";
import style from "../Styles/ProductList.module.css";
import { Button, CardTitle, CardBody } from "reactstrap";
import { Link } from "react-router-dom"

function ScheduleList({ product }) {
  
  return (
    <div className={style.card_div}>
      <img
        className={style.image_Card}
        src={product.image}
        alt="productImage"
      />
      <CardBody>
        <CardTitle>{product.productName}</CardTitle>
        <CardTitle>Price : {product.price}</CardTitle>
        <Link to={`/productdetaill/${product._id}`}><button className={"no-focusborder"} >Get Detaill</button></Link>
      </CardBody>
    </div>
  );
}

export default ScheduleList;
