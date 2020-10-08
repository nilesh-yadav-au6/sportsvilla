import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './PlayerSass.sass'

class PLayerListItem extends Component {
    render() {
        return (
            <div class="wrapper">
                <div class="card">
                <img src={this.props.player.avatar} alt="Sports-Villa-Players" />
                    <div class="info">
                        <h1>{this.props.player.name}</h1>
                        <p></p>
                        <Link to={`/player/detail/${this.props.player._id}`} ><button>Get Detail</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PLayerListItem
