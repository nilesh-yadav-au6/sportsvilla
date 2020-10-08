import React from "react";
import style from "../Styles/ScheduleList.module.css";
import { CardTitle, CardBody, } from "reactstrap";
import { Link } from "react-router-dom"

function ScheduleList({ schedule }) {
  return (
    <div className={style.card_div}>
      <span>
        <img
          className={style.image_Card}
          src={schedule.team1ImageUrl}
          alt='teamName'
        />
        <span>VS</span>
        <img
          className={style.image_Card}
          src={schedule.team2ImageUrl}
          alt='oppTeam'
        />
      </span>
      <CardBody>
        <CardTitle>Date : {schedule.matchDate}</CardTitle>
        <Link to={`/shceduledetaill/${schedule._id}`}><button className={"no-focusborder"} >Get Detaill</button></Link>
      </CardBody>
    </div>
  );
}

export default ScheduleList;
