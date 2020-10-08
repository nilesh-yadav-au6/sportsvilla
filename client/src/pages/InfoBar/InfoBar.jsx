import React from 'react';
import { Link } from 'react-router-dom'
import onlineIcon from '../../icons/onlineIcon.png';
import { closeAuction } from '../../redux/actions/addAuction'
import {connect} from 'react-redux'
import './InfoBar.css';

const InfoBar = (props) => {
  const handelCloseAuction = e =>{
    e.preventDefault()
    props.closeAuction()
    props.leave()
    props.history.push('/dashboard')
  }
  
  const handelLeaveAuction = e =>{
    e.preventDefault()
    props.leave()
    props.history.push('/dashboard')
  }
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>Auction</h3>
      </div>
      <div className="rightInnerContainer">
        {console.log(props.uzer)}
        <Link to="/dashboard"> {props.uzer.role === 'Admin'?<button style={{background: "#40B4E5", borderRadius: "25px"}} className={"no-focusborder"} onClick={handelCloseAuction} >Close Auction</button>: <button style={{background: "#40B4E5", borderRadius: "25px"}} className={"no-focusborder"} onClick={handelLeaveAuction} >Leave Auction</button>} </Link>
      </div>
    </div>
  )
};

export default connect(null, { closeAuction })(InfoBar);