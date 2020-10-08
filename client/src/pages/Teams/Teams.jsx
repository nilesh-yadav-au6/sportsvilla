import React, { Component } from 'react'
import { connect } from "react-redux"
import { fetchTeam } from "../../redux/actions/teamAcrion"
import TeamList from '../../components/TeamListItem/TeamListItem'
import style from './Team.module.css'

class Teams extends Component {
    
    componentDidMount(){
        this.props.fetchTeam(1, 8)
    }
    pagination = e => {
        console.log(e.target.value)
        this.props.fetchTeam(e.target.value, 8)
    }
    render() {
        return (
            <div>
                <div className={style.parentDiv} >
                {this.props.teams.length !== 0
                    ? this.props.teams.map((teams) => (
                        <div className={style.TeamDiv} >
                            <TeamList key={teams._id} team={teams} {...this.props}/>
                        </div>
                    ))
                    : <div className={style.loader}>Loading...</div>}
                </div>
                <div style={{marginBottom: "20px", marginTop: "20px", marginLeft: "50%"  }}>
                    {this.props.teams !== null?(() => {
                        const options = [];
                        for (let i = 1; i <= Math.ceil(this.props.count/8); i++) {
                            options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                            {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                            {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
                        }
                        return options;
                        })(): null}
                </div>
            </div>
        )
    }
}

const mapStateProp = stateStore => {
    return {
        teams : stateStore.teamState.teams,
        count : stateStore.teamState.count,
        page : stateStore.teamState.page
    }
}

export default connect(mapStateProp, { fetchTeam })(Teams)
