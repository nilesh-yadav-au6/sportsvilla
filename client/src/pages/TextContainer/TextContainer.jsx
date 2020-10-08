import React from 'react';
import {connect} from 'react-redux'
import onlineIcon from '../../icons/onlineIcon.png';
import { playerAuction } from '../../redux/actions/addAuction'
import './TextContainer.css';

const TextContainer = ({ users }) => {

  return (
    <div className="textContainer">
      {
        users
          ? (
            <>
              <h1>Teams currently Auctioning:</h1>
              <div className="activeContainer">
                {/* <h2> */}
                  {users.map(({name}) => (
                    <div key={name} className="activeItem">
                      {name}
                      <img alt="Online Icon" src={onlineIcon}/>
                    </div>
                  ))}
                {/* </h2> */}
              </div>
            </>
          )
          : null
      }
    </div>
  )
}

const mapStateToProps = storeState => {
  return {
    currentPlayer: storeState.auctionState.curPlayer,
    user: storeState.loginState.user,
  }
}
export default connect(mapStateToProps, {playerAuction})(TextContainer)