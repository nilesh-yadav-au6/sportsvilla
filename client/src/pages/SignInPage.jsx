import React, { Component } from 'react'
import './Register/RegisterPage.css'
import { Link } from 'react-router-dom'
import googleLogo from '../images/google.png'
import facebookLogo from '../images/facebook.png'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/loginAction'
import { Redirect } from 'react-router-dom'

class SignInPage extends Component {

    state = {
        email: "",
        password: ""
    }
    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSubmit = e => {
        e.preventDefault()
        this.props.loginUser({...this.state})
    }

    // handelGoogle = async e => {
    //     e.preventDefault()
    //     const {data} = await axios('http://localhost:1234/user/google')
        //     console.log(data)
    // }
    render() {
        return (
            <div className='parentDiv'>

            <div className="box" >
                <div className='heading' >
                    <h2>
                        SignIn  
                    </h2> 
                    <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>or</h2>
                    <span><Link to='/register' > createa an account </Link> </span>
                </div>
                <br/>
                <div className='SigninBtn' >
                    <a href='user/facebook' > <button> <img src={facebookLogo} id={'Special1'} style={{width: '30px'}} alt="Facebook"/> Facebook</button></a>
                    <a href='user/google' > <button> <img src={googleLogo} id={'Special2'} style={{width: '30px'}} alt="Google"/> Google</button></a>
                </div>
                <div className="overlay__divider overlay__divider--with-text">
                    <h6 style={{textAlign: "center"}} >Or</h6>
                </div>
                <br/>
                <form>
                    {this.props.error !== null && this.props.error !== undefined ?<p style={{color: 'red'}} >Incorrect credentials</p>: null }
                    {this.props.user !== null && this.props.user !== undefined ? <Redirect to='/dashboard' /> : <Redirect to='/signin' /> }
                    <div className='inputBox'>
                        <input type="email" name='email' onChange={this.handelChange} value={this.state.email} required />
                        <label>Email *</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" name='password' onChange={this.handelChange} value={this.state.password} required />
                        <label>Password *</label>
                    </div>
                    <Link style={{float: 'right'}} to='/forgotPassword' >Forgot Password?</Link>
                    <input type="submit" onClick={this.handelSubmit} value="Sign In" />
                </form>                
            </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
        error: storeState.loginState.error
    }
}

export default connect(mapStateToProps, {loginUser})(SignInPage)
