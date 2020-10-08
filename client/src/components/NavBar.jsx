import React, { Component } from 'react'
import style from "../Styles/NavBar.module.css";
import { Link } from 'react-router-dom'
import AdminNav from './AdminNav'
import { connect } from 'react-redux'
import { logOutUser } from '../redux/actions/loginAction'
import {Badge} from 'react-bootstrap'
import { getCartAction } from '../redux/actions/addCartAction'
import ProfileImage from '../images/profilepic.png'

class NavBar extends Component {
    state = {
        user: null
    }    
    componentDidMount(){
        this.setState({user: this.props.user})
    }
    componentWillUpdate(){
        
    }
    handelClick = () =>{
        this.props.logOutUser()
    }

    forceUpdate(){
        console.log(this.props.user,11111)
    }
    render() {
        return (
            <div className={style.parent} >
                {console.log(this.props.user,4444)}
                <nav className={style.myNav} >
                    <Link style={{ color: 'white' }} className={style.myLink} to='/' >Sports-Villa</Link>
                    <Link style={{ color: 'white' }} className={style.myLink} to='/products' >Products</Link>
                    <Link style={{ color: 'white' }} className={style.myLink} to='/teams' >Teams</Link>
                    <Link style={{ color: 'white' }} className={style.myLink} to='/schedules' >Schedules </Link>
                    {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?<AdminNav {...this.props} />:null}
                    {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?
                    <Link style={{ color: 'white' }} className={style.myLink} to='/dashboard' >Dashboard</Link>:null}
                    {this.props.user!==null && this.props.user.data.commenUser.role==='Manager'?
                    <Link style={{ color: 'white' }} className={style.myLink} to='/dashboard' >Dashboard</Link>:null}
                    {this.props.user===null?
                        <Link style={{ color: 'white' }} className={style.myLink} to='/signin' >SignIn</Link>
                        :<>
                            <Link style={{ color: 'white' }} className={style.myLink} to='/logout' onClick={ this.handelClick } >LogOut</Link>
                        </>
                    }
                    <Link style={{ color: 'white' }} className={style.myLink} to='/cart' >Cart <Badge style={{borderRadius: '50%'}} variant="light">{ this.props.user !== null?this.props.cartState.cart.length:0}</Badge></Link>
                    {this.props.user!==null && this.props.user.data.commenUser.role==='User'?<Link style={{ color: 'white' }} className={style.myLink} to='/profile' > <img src={this.props.user.data.commenUser.profilePic || ProfileImage } style={{width: '40px', height: '40px', borderRadius: '50%'}} alt=""/> </Link>:null}
                </nav>   
            </div>
        )
    }
}
const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
        cartState: storeState.getCartState,
    }
}

    export default connect(mapStateToProps, {logOutUser, getCartAction})(NavBar)
