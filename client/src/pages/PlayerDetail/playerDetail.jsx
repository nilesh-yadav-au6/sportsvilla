import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlayers, singlePlayer, deletePlayerAdmin, updatePlayerAdminAction } from '../../redux/actions/playerActions'
import { Collapse } from 'reactstrap';
import style from './PlayerDetail.module.css'

class playerDetail extends Component {
    
    state={
        isPlayer: false,
        name: "", age: "", country: "", battingStyle: "", bowlingStyle: "", speciality: "", basePrice: "", soldPrice: "", soldTeam: "",
        avatar: "", description: "",
        toggleDelete: false,
    }

    componentDidMount(){
        this.props.singlePlayer(this.props.match.params.playerId)
    }
    
    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    handelSingleFile = e => {
        const image = e.target.files[0]
        this.setState({ image })
    }
    

    handelUpdatePlayer = e => {
        e.preventDefault()
        const playerId = this.props.match.params.playerId
        try{
            const {name, age, country, battingStyle, bowlingStyle, speciality, basePrice, soldPrice, soldTeam, image, description} = this.state
            this.props.updatePlayerAdminAction({name, age, country, battingStyle, bowlingStyle, speciality, basePrice, soldPrice, soldTeam, image, description, playerId})
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{
                this.props.singlePlayer(playerId)
            }, 8000)
        }
    }

    handelDeletePlayer = e => {
        try{
            const playerId = this.props.match.params.playerId;
            this.props.deletePlayerAdmin(playerId)
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{
                this.props.fetchPlayers(1,8)
                this.props.history.push('/players')
            }, 1000)
        }
    }

    handelDeleteToggle = () => {
        this.setState({ toggleDelete: !this.state.toggleDelete })
    }

    togglePlayer = () => this.setState({ isPlayer: !this.state.isPlayer, isProductOpen: false, isSchedule: false, isManagement: false, })
    

    render() {
        return (
            this.props.player !== null?
            <div className={style.card_div} >
                <div className={style.newPro} >

                <div className={style.child1Pro} >
                    <img className={style.image_Card} src={this.props.player.avatar} alt="Sports-VillaTeam" />
                </div>
                <div className={style.childPro} >
                    <h1>Name: {this.props.player.name}</h1>
                    <h1>Age: {this.props.player.age}</h1>
                    <h1>Role: {this.props.player.speciality}</h1>
                    <h1>Batting Style: {this.props.player.battingStyle}</h1>
                    <h1>Bowling Style: {this.props.player.bowlingStyle}</h1>
                    {!this.props.player.soldTeamName? null: <h1>Sold Team: {this.props.player.soldTeamName}</h1> }
                    {!this.props.player.soldPrice? null: <h1>Sold Price: {this.props.player.soldPrice}</h1> }
                <div className={style.child2Pro} >
                    {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?
                        <>
                        <button className={"no-focusborder"} color="primary" onClick={this.togglePlayer}>UpdatePlayer</button>
                        <button className={"no-focusborder"} onClick={this.handelDeleteToggle} >Delete Player</button>
                        {this.state.toggleDelete?
                        <div className={style.popup} >
                        <div className={style.mainPop} > 
                            <h4>Are you Sure ?</h4>
                            <button className={"no-focusborder"} onClick={this.handelDeleteToggle} > cancel </button> 
                            <button className={"no-focusborder"} color="danger" onClick={ this.handelDeletePlayer } >Delete</button>
                        </div>
                        </div>:null}

                        </>
                    :null}
                </div>
                        <Collapse isOpen={this.state.isPlayer}>
                        <div className="input-fields">
                            <form encType='multipart/form-data' onSubmit={this.handelUpdatePlayer} >
                                <input type="text" name='name' onChange={this.handelChange} value={this.state.name} className="input" placeholder="Name" />
                                <input type="text" name='age' onChange={this.handelChange} value={this.state.age} className="input" placeholder="Age" />
                                <input type="text" name='country' onChange={this.handelChange} value={this.state.country} className="input" placeholder="Country" />
                                <input type="text" name='battingStyle' onChange={this.handelChange} value={this.state.battingStyle} className="input" placeholder="Batting Style" />
                                <input type="text" name='bowlingStyle' onChange={this.handelChange} value={this.state.bowlingStyle} className="input" placeholder="Bowling Style" />
                                <input type="text" name='speciality' onChange={this.handelChange} value={this.state.speciality} className="input" placeholder="Speciallity" />
                                <input type="text" name='basePrice' onChange={this.handelChange} value={this.state.basePrice} className="input" placeholder="Base Price" />
                                <input type="text" name='soldPrice' onChange={this.handelChange} value={this.state.soldPrice} className="input" placeholder="Sold Price" />
                                <input type="text" name='soldTeam' onChange={this.handelChange} value={this.state.soldTeam} className="input" placeholder="Sold Team" />
                                <input type="text" name='description' onChange={this.handelChange} value={this.state.description} className="input" placeholder="Description" />
                                <input type="file" name="image" onChange={this.handelSingleFile}/>
                                <button className={"no-focusborder"} type='submit' >Submit</button>
                            </form>
                        </div>
                    </Collapse>
                </div>
                </div>
            </div>
            :<div className={style.loader}>Loading...</div>
        )
    }
}

const mapStateProp = (stateStore) => {
    return {
        player: stateStore.playerState.singlePlayer,
        user: stateStore.loginState.user,
    };
};

export default connect(mapStateProp, { fetchPlayers, singlePlayer, deletePlayerAdmin, updatePlayerAdminAction })(playerDetail)
