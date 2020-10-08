import React from "react";
import { CardTitle, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import style from "../HofList/HofPlayersList.module.css"

function ScheduleList({ hofPlayer }) {
  
  return (
      <Link style={{ color: 'white' }} className={style.myLink} to={`/hofplayes/detaill/${hofPlayer._id}`}>
        <div className={style.card_div}>
      <img
        className={style.image_Card}
        src={hofPlayer.image}
        alt="hofPlayerImage"
      />
      <CardBody>
        <CardTitle>{hofPlayer.name}</CardTitle>
      </CardBody>
    </div>
      </Link>
  );
}

export default ScheduleList;
