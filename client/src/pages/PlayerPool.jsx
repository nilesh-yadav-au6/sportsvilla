import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlayers } from '../redux/actions/playerActions'
import { Redirect } from 'react-router-dom'
import PlayerListItem from '../components/PLayerList/PLayerListItem'
import style from './Products/Products.module.css'

class PlayerPool extends Component {
    state ={
        black: true
    }

    componentDidMount(){
        this.props.fetchPlayers(1,8)
    }

    pagination = e => {
        console.log(e.target.value)
        this.setState({currentButton: e.target.value})
        this.props.fetchPlayers(e.target.value, 8)
    }


    render() {
        return (
            this.props.user.data.commenUser.role==='Admin' || this.props.user.data.commenUser.role==='Manager'?
            <div>
            <div style={{minHeight: "80vh" ,display:"flex" , flexWrap:"wrap" ,textAlign:"center" ,justifyContent:"space-evenly"}} >
                {this.props.players.length !== 0
                ? this.props.players.map((player) => (
                    <div className={style.ProductDiv} >
                        <PlayerListItem key={player._id} player={player} {...this.props}/>
                    </div>
                ))
                : <div className={style.loader}>Loading...</div>}
            </div>
            <div style={{ marginBottom: "20px", marginTop: "20px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
            {this.props.product!==null?<button className={'no-focusborder'} value={parseInt(this.props.page)-1>0?parseInt(this.props.page)-1:1} onClick={this.pagination} >Prev</button>:null}
            {this.props.product !== null?(() => {
                const options = [];
                if(Math.ceil(this.props.count/8)<=10){
                for (let i=1; i <= Math.ceil(this.props.count/8); i++) {
                    options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                    {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                    {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
                }
                }
                else if(Math.ceil(this.props.count/8)>10 && parseInt(this.props.page)+9<= Math.ceil(this.props.count/8)){
                console.log('hello form here')
                for (let i=parseInt(this.props.page); i <= parseInt(this.props.page)+9; i++) {
                    options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                    {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                    {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
                    }
                }
                else if(Math.ceil(this.props.count/8)>10 && parseInt(this.props.page)+9> Math.ceil(this.props.count/8)){
                    console.log('hello form here as well')
                    for (let i=Math.ceil(this.props.count/8)-9; i <= Math.ceil(this.props.count/8); i++) {
                    options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                    {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                    {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
                    }
                }
                return options;
                })(): null}
            {this.props.product!==null?<button className={'no-focusborder'} value={parseInt(this.props.page)+1<Math.ceil(this.props.count/8)?parseInt(this.props.page)+1:Math.ceil(this.props.count/8)} onClick={this.pagination} >Next</button>:null}
            </div>
            </div>:<Redirect to='/'/>
        )
    }
}

const mapStateProp = (stateStore) => {
    return {
        players: stateStore.playerState.players,
        user: stateStore.loginState.user,
        count: stateStore.playerState.count,
        page: stateStore.playerState.page
    };
};

export default connect(mapStateProp, { fetchPlayers }) (PlayerPool)
