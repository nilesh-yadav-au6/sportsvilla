import React, { Component } from 'react'
import { Collapse } from 'reactstrap';
import '../Styles/AddProducts.css'
import { connect } from 'react-redux'
import { addProductAdminAction } from '../redux/actions/productAction'
import { addScheduleAdminAction } from '../redux/actions/scheduleAction'
import { addManagementAdminAction } from '../redux/actions/managementAction'
import { addPlayerAdminAction } from '../redux/actions/addPlayerAction'
import { createAuction } from '../redux/actions/addAuction'
import { addPlayerHOF } from "../redux/actions/hofAuction"
import { Link } from 'react-router-dom'

class AddProduct extends Component {
    state = {
        isProductOpen: false, isSchedule: false, isPlayer: false, isManagement: false,isHOF: false,
        productName: "", brand: "", price: "", category: "", 
        matchType: "", matchDate: "", matchPlace: "", team1: "", team2: "", capacity: "", image: "",
        teamName: "", email: "", personalEmail: "", password: "", manager: "",
        name: "", age: "", country: "", battingStyle: "", bowlingStyle: "", speciality: "", basePrice: "", soldPrice: "", soldTeam: "",
        avatar: "", description: "", dob:"" , debut:"", inducted:"", testRuns:"", odiRuns:"", career:"",playerBio:"",hundreds:""
    }

    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    
    handelSingleFile = e => {
        const image = e.target.files[0]
        this.setState({ image })
    }

    handelMultipleFile = e =>{
        const image = e.target.files
        this.setState({ image })
    }

    handelAddPlayerHOF = e => {
        e.preventDefault()
        const {name, dob, country, battingStyle, bowlingStyle, speciality,debut, testRuns, odiRuns, inducted , career, playerBio,hundreds, image} = this.state
        this.props.addPlayerHOF({name, dob, country, battingStyle, bowlingStyle, speciality,debut, testRuns, odiRuns, inducted , career, playerBio,hundreds, image})
    }

    handelAddProducts = e => {
        e.preventDefault()
        const { productName, brand, price, category, image } = this.state
        this.props.addProductAdminAction({productName, brand, price, category, image})
    }

    handelAddSchedules = e =>{
        e.preventDefault()
        const {matchType, matchDate, matchPlace, team1, team2, capacity, image, price} = this.state
        this.props.addScheduleAdminAction({matchType, matchDate, matchPlace, team1, team2, capacity, image, price})
    }
    
    handelAddManagements = e => {
        e.preventDefault()
        const { teamName, email, personalEmail, password, manager, image } = this.state
        this.props.addManagementAdminAction({ teamName, email, personalEmail, password, manager, image })
    }

    handelAiction = e => {
        this.props.createAuction()
    }
    handelAddPlayer = e => {
        e.preventDefault()
        const {name, age, country, battingStyle, bowlingStyle, speciality, basePrice, soldPrice, soldTeam, avatar, description, image} = this.state
        this.props.addPlayerAdminAction({name, age, country, battingStyle, bowlingStyle, speciality, basePrice, soldPrice, soldTeam, avatar, description, image})
    }
    toggleProduct = () => this.setState({ isProductOpen: !this.state.isProductOpen, isSchedule: false, isPlayer: false, isManagement: false,isHOF:false });
    toggleSchedule = () => this.setState({ isSchedule: !this.state.isSchedule, isProductOpen: false, isPlayer: false, isManagement: false,isHOF:false })
    togglePlayer = () => this.setState({ isPlayer: !this.state.isPlayer, isProductOpen: false, isSchedule: false, isManagement: false,isHOF:false })
    toggleManagement = () => this.setState({ isPlayer: false, isProductOpen: false, isSchedule: false, isManagement: !this.state.isManagement,isHOF:false })
    toggleHOF = () => this.setState({ isHOF: !this.state.isHOF, isProductOpen: false, isSchedule: false, isManagement: false,isPlayer: false })
    render() {
        return (
            <div className={"superParent"} >
                <h1>Welcome {this.props.user.data.commenUser.name} </h1>
                <button className={"no-focusborder"} onClick={this.toggleProduct} style={{ marginBottom: '1rem' }}>Add Product</button>
                <button className={"no-focusborder"} onClick={this.toggleSchedule} style={{ marginBottom: '1rem' }}>Add Schedule</button>
                <button className={"no-focusborder"} onClick={this.togglePlayer} style={{ marginBottom: '1rem' }}>Add Player</button>
                <button className={"no-focusborder"} onClick={this.toggleManagement} style={{ marginBottom: '1rem' }}>Add Management</button>
                <button className={"no-focusborder"} onClick={this.toggleHOF} style={{ marginBottom: '1rem' }}>Add Hall Of Fame Player</button>
                <Link to={`/auction`} ><button className={"no-focusborder"} onClick={this.handelAiction} style={{ marginBottom: '1rem' }} >Create Auction</button></Link>
                <Collapse isOpen={this.state.isProductOpen}>
                        <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                            <form encType='multipart/form-data' onSubmit={this.handelAddProducts} >
                                <input type="text" name='productName' onChange={this.handelChange} value={this.state.productName} className="input" placeholder="Product Name" />
                                <input type="text" name='brand' onChange={this.handelChange} value={this.state.brand} className="input" placeholder="Brand" />
                                <input type="text" name='price' onChange={this.handelChange} value={this.state.price} className="input" placeholder="Price" />
                                <input type="text" name='category' onChange={this.handelChange} value={this.state.category} className="input" placeholder="Category" />
                                <input type="file" name='image' onChange={this.handelSingleFile}  />
                                <button className={"no-focusborder"} type='submit' >Add</button>
                            </form>
                        </div>
                </Collapse>
                <Collapse isOpen={this.state.isSchedule}>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                        <form encType='multipart/form-data' onSubmit={this.handelAddSchedules} >
                            <input type="date" name='matchDate' onChange={this.handelChange} value={this.state.matchDate} className="input" placeholder="Match Date" />
                            <input type="text" name='matchType' onChange={this.handelChange} value={this.state.matchType} className="input" placeholder="Match Type" />
                            <input type="text" name='matchPlace' onChange={this.handelChange} value={this.state.matchPlace} className="input" placeholder="Match Place" />
                            <input type="text" name='team1' onChange={this.handelChange} value={this.state.team1} className="input" placeholder="Team 1" />
                            <input type="text" name='team2' onChange={this.handelChange} value={this.state.team2} className="input" placeholder="Team 2" />
                            <input type="text" name='capacity' onChange={this.handelChange} value={this.state.capacity} className="input" placeholder="Capacity" />
                            <input type="text" name='price' onChange={this.handelChange} value={this.state.price} className="input" placeholder="Price" />
                            <input type="file" name='image' onChange={this.handelMultipleFile} multiple />
                            <button className={"no-focusborder"} type='submit' >Add</button>
                        </form>
                    </div>
                </Collapse>
                <Collapse isOpen={this.state.isPlayer}>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                        <form encType='multipart/form-data' onSubmit={this.handelAddPlayer} >
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
                            <button className={"no-focusborder"} type='submit' >Add</button>
                        </form>
                    </div>
                </Collapse>
                <Collapse isOpen={this.state.isManagement}>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                        <form encType='multipart/form-data' onSubmit={this.handelAddManagements} >
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
                <Collapse isOpen={this.state.isHOF}>
                    <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap', justifyContent: 'space-around', width: "calc(100vw-20px)", margin: '10px'}} className="input-fields">
                        <form encType='multipart/form-data' onSubmit={this.handelAddPlayerHOF} >
                            <input type="text" name='name' onChange={this.handelChange} value={this.state.name} className="input" placeholder="Name" />
                            <input type="date" name='dob' onChange={this.handelChange} value={this.state.dob} className="input" placeholder="Date Of Birth" />
                            <input type="text" name='country' onChange={this.handelChange} value={this.state.country} className="input" placeholder="Country" />
                            <input type="text" name='battingStyle' onChange={this.handelChange} value={this.state.battingStyle} className="input" placeholder="Batting Style" />
                            <input type="text" name='bowlingStyle' onChange={this.handelChange} value={this.state.bowlingStyle} className="input" placeholder="Bowling Style" />
                            <input type="text" name='speciality' onChange={this.handelChange} value={this.state.speciality} className="input" placeholder="Speciallity" />
                            <input type="text" name='inducted' onChange={this.handelChange} value={this.state.inducted} className="input" placeholder="Inducted" />
                            <input type="text" name='hundreds' onChange={this.handelChange} value={this.state.hundreds} className="input" placeholder="Hundreds OR Best Figures" />
                            <input type="text" name='debut' onChange={this.handelChange} value={this.state.debut} className="input" placeholder="Debut Year" />
                            <input type="text" name='career' onChange={this.handelChange} value={this.state.career} className="input" placeholder="Career Span" />
                            <input type="text" name='playerBio' onChange={this.handelChange} value={this.state.playerBio} className="input" placeholder="Player Bio" />
                            <input type="number" name='testRuns' onChange={this.handelChange} value={this.state.testRuns} className="input" placeholder="Test Runs Or Test Wickets" />
                            <input type="number" name='odiRuns' onChange={this.handelChange} value={this.state.odiRuns} className="input" placeholder="ODI Runs Or ODI Wickets" />
                            <input type="file" name="image" onChange={this.handelSingleFile}/>
                            <button className={"no-focusborder"} type='submit' >Add</button>
                        </form>
                    </div>
                </Collapse>
            </div>
        )
    }
}
const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
    }
}
export default connect(mapStateToProps, { addProductAdminAction, addScheduleAdminAction, addManagementAdminAction, addPlayerAdminAction, createAuction ,addPlayerHOF })(AddProduct)
