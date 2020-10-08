import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import style from './AuctionPlayers.module.css'
import { connect } from 'react-redux'
import { playerAuction } from '../../redux/actions/addAuction'

class AuctionPlayer extends Component {
        
    handelAuction = e => {
        e.preventDefault()
        this.props.func(e.target.id)
    }
    render() {
        return (
            <div className={style.card_div} >
            <Card.Img style={{height: '300px'}}  variant="top" src={this.props.player.avatar} />
            <Card.Body>
                <Card.Title>{this.props.player.name}</Card.Title>
                {!this.props.player.soldTeam?<button style={{background: "#40B4E5", borderRadius: "25px"}} className={"no-focusborder"} onClick={this.handelAuction} id={this.props.player._id} >Add To Auction</button>: <button className={"no-focusborder"} style={{background: "#40B4E5", borderRadius: "25px"}} disabled >Sold</button> }
            </Card.Body>
            </div>
        )
    }
}



export default connect(null, {playerAuction})(AuctionPlayer)
