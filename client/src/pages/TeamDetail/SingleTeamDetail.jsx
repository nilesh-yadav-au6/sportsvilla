import React, { Component } from 'react'
import { connect } from 'react-redux'
import { singleTeam, fetchTeam } from '../../redux/actions/teamAcrion'
import { Collapse } from 'reactstrap'
import { deleteManagementAdmin, updateManagementAdminAction } from '../../redux/actions/managementAction'
import PlayerListItem from '../../components/PLayerList/PLayerListItem'
import style from './singleTeamDetail.module.css'

class SingleTeamDetail extends Component {
    
    state = {
        isManagement: false,
        teamName: "", email: "", personalEmail: "", password: "", manager: "",
        toggleDelete: false,
    }

    componentDidMount(){    
        const teamId = this.props.match.params.teamId;
        this.props.singleTeam(teamId)
    }
    
    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    handelMultipleFile = e =>{
        const image = e.target.files
        this.setState({ image })
    }
    
    toggleManagement = () => this.setState({ isManagement: !this.state.isManagement })
    
    handelUpdateManagement = e => {
        e.preventDefault()
        const teamId = this.props.match.params.teamId;
        try{
            const { teamName, email, personalEmail, password, manager, image } = this.state
            console.log({ teamName, email, personalEmail, password, manager, image, teamId }, 852258)
            this.props.updateManagementAdminAction({ teamName, email, personalEmail, password, manager, image, teamId })
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{
                this.props.singleTeam(teamId)
            },5000)
        }
    }

    handelDeleteManagement = () =>{
        try{
            const teamId = this.props.match.params.teamId;
            this.props.deleteManagementAdmin(teamId)
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{
            this.props.fetchTeam()
            this.props.history.push('/teams')
            }, 1000)
        }
    }
    
    handelSingleFile = e => {
        const image = e.target.files[0]
        this.setState({ image })
    }
    
    handelDeleteToggle = () => {
        this.setState({ toggleDelete: !this.state.toggleDelete })
    }
    
    render() {
        return (
            this.props.team !== null?
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
            {/* <Card.Body> */}
                <h1>Team Name: {this.props.team.teamName}</h1>
                <h1>Owner: {this.props.team.manager}</h1>
                <div className={style.child2Pro} >
                {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?
                    <>
                    <button className={"no-focusborder"} onClick={this.toggleManagement} >Update Management</button>
                    <button className={"no-focusborder"} onClick={this.handelDeleteToggle} >Delete Management</button>
                    {this.state.toggleDelete?
                        <div className={style.popup} >
                        <div className={style.mainPop} > 
                            <h4>Are you Sure ?</h4>
                            <button className={"no-focusborder"} onClick={this.handelDeleteToggle} > cancel </button> 
                            <button className={"no-focusborder"} color="danger" onClick={ this.handelDeleteManagement } >Delete</button>
                        </div>
                        </div>:null}
                    </>
                :null}
                </div>
                    <Collapse isOpen={this.state.isManagement}>
                        <div className="input-fields">
                            <form encType='multipart/form-data' onSubmit={this.handelUpdateManagement} >
                                <input type="text" name='teamName' onChange={this.handelChange} value={this.state.teamName} className="input" placeholder="Team Name" />
                                <input type="email" name='email' onChange={this.handelChange} value={this.state.email} className="input" placeholder="Email" />
                                <input type="email" name='personalEmail' onChange={this.handelChange} value={this.state.personalEmail} className="input" placeholder="PersonalEmail" />
                                <input type="password" name='password' onChange={this.handelChange} value={this.state.password} className="input" placeholder="Password" />
                                <input type="text" name='manager' onChange={this.handelChange} value={this.state.manager} className="input" placeholder="Manager Name" />
                                <input type="file" name='image' onChange={this.handelSingleFile} />
                                <button className={"no-focusborder"} type='submit' >Add</button>
                            </form>
                        </div>
                    </Collapse>
            {/* </Card.Body> */}
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
            :<div className={style.loader}>Loading...</div>
        )
    }
}

const mapStateProp = (stateStore) => {
    return {
        team: stateStore.teamState.singleTeam,
        players: stateStore.teamState.players,
        user: stateStore.loginState.user,
    };
};

export default connect(mapStateProp, {singleTeam, fetchTeam, deleteManagementAdmin, updateManagementAdminAction})(SingleTeamDetail)
