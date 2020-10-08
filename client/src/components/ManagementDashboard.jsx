import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { singleTeam } from '../redux/actions/teamAcrion'
import style from '../pages/TeamDetail/singleTeamDetail.module.css'
import PlayerListItem from './PLayerList/PLayerListItem'


class ManagementDashboard extends Component {
    
    componentDidMount(){    
        this.props.singleTeam(this.props.user.data.commenUser._id)
    }

    render() {
        return (
            <div style={{textAlign: "center", marginTop: "20px"}} >
                {this.props.teamDetail!==null && this.props.teamDetail.auction!==null? <Link to={`/auction`} ><button className={"no-focusborder"} >Join Auction </button></Link>: <button className={"no-focusborder"} disabled >Join Auction</button> }
                {this.props.team !== null?
            <div>
            <div className={style.card_div}>
            <div className={style.newPro} >
            <div className={style.child1Pro} >
                <img
                className={style.image_Card}
                src={this.props.team.teamImage}
                alt='teamName'
                />  
            </div>
            <div className={style.childPro} >
                <h1>Team Name: {this.props.team.teamName}</h1>
                <h1>Owner: {this.props.team.manager}</h1>
                <div className={style.child2Pro} >
                </div>
            </div>
            </div>
            </div>
            <div style={{display:"flex" , flexWrap:"wrap" ,textAlign:"center" ,justifyContent:"space-evenly" , background:"#EEF2F7"}} >
                {this.props.players.length !== 0
                ? this.props.players.map((player) => (
                    <div className={style.ProductDiv} >
                        <PlayerListItem key={player._id} player={player} {...this.props}/>
                    </div>
                ))
                : null}
            </div>
            </div>
            :<div className={style.loader}>Loading...</div>}
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        team: storeState.teamState.singleTeam,
        players: storeState.teamState.players,
        user: storeState.loginState.user,
        teamDetail: storeState.teamState.singleTeam
    }
}

export default connect(mapStateToProps, {singleTeam})(ManagementDashboard)
