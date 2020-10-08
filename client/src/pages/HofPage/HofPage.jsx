import React, { Component } from 'react'
import { getHOFALL } from "../../redux/actions/hofAuction"
import HofPlayerList from "../../components/HofList/HofPlayersList"
import { connect }  from "react-redux"
import style from "../../pages/HofPage/HofPage.module.css"


class HofPage extends Component {

    componentDidMount(){
        this.props.getHOFALL()
      }
    
      pagination = e => {
        console.log(e.target.value)
        this.props.getHOFALL(e.target.value, 3)
      }
    
      render(){
        return (
          <div>
          <div className={style.hofPlayers}>
            {this.props.hofPlayer !== null
              ? this.props.hofPlayer.map((hofPlayer) => (
                  <HofPlayerList key={hofPlayer._id} hofPlayer={hofPlayer} />
                ))
              : <div className={style.loader}>Loading...</div>}
          </div>
          </div>
        );
      }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
        hofPlayer:storeState.hofPlayerState.hofPlayers
    }
}

export default connect(mapStateToProps , { getHOFALL })(HofPage);
