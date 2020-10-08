import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './TeamListItem.sass'

export class TeamListItem extends Component {
    render() {
        return (
            <div class="wrapper">
                <div class="card">
                <img src={this.props.team.teamImage} alt="Sports-Villa-Players" />
                    <div class="info">
                        <h1>{this.props.team.teamName}</h1>
                        <p></p>
                        <Link to={`/team/detail/${this.props.team._id}`} ><button>Get Detail</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamListItem
