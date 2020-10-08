import React, { Component } from 'react'
import './Register/RegisterPage.css'
import {connect} from 'react-redux'
import { forgotPasswordUser } from '../redux/actions/forgotPasswordAction'
import { NotificationManager } from 'react-notifications';

export class ForgotPassword extends Component {
    
    state = {
        email: "",
    }

    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSubmit = e => {
        e.preventDefault()
        this.props.forgotPasswordUser({...this.state})
    }
    
    render() {
        return (
            <div className="parentDiv">
            <div className="box" >
                <h2>Forgot Password</h2>
                <p style={{color: 'black'}} >Enter the email address you used to create an account and we will send instructions on how to reset your password.</p>
                {this.props.email !== null && this.props.email !== undefined ?this.props.email.statusCode === 400?<p  style={{color: 'red', marginLeft: 10, marginBottom: 20}} >{this.props.email.message}</p>: null:null}
                <form>
                    <div className='inputBox'>
                        <input type="email" name='email' onChange={this.handelChange} value={this.state.email} required />
                        <label>Email</label>
                    </div>
                    <input type="submit" onClick={this.handelSubmit} value="Send instructions" />
                </form>                
            </div>
                {this.props.email !== null && this.props.email !== undefined ?this.props.email.statusCode === 200? NotificationManager.success(this.props.email.message, 'Success') : null:null}
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        email: storeState.forgotEmailState.email
    }
}

export default connect(mapStateToProps, {forgotPasswordUser})(ForgotPassword)
