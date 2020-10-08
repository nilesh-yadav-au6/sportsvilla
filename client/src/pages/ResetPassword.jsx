import React, { Component } from 'react'
import './Register/RegisterPage.css'
import { resetPasswordUser } from '../redux/actions/resetPasswordAction'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications';

class ResetPassword extends Component {
    state ={
        newPassword: "",
        confirmPassword: "",
    }

    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSubmit = e => {
        e.preventDefault()
        // this.props.match.params.resetToken
        this.props.resetPasswordUser({resetToken: this.props.match.params.resetToken, ...this.state})
    }

    render() {
        return (
            <div className='parentDiv'>

            <div className="box" >
                <div className='heading' >
                    <h2>
                        Reset Password  
                    </h2> 
                    <br />
                    <br />
                </div>
                {this.props.email !== null && this.props.email !== undefined ?this.props.email.statusCode === 400 || this.props.email.statusCode === 401 ?<p  style={{color: 'red', marginLeft: 10, marginBottom: 20}} >{this.props.email.message}</p>: null:null}
                <form>
                    <div className='inputBox'>
                        <input type="password" name='newPassword' onChange={this.handelChange} value={this.state.newPassword} required />
                        <label>newPassword *</label>
                    </div>
                    <div className='inputBox'>
                        <input type="password" name='confirmPassword' onChange={this.handelChange} value={this.state.confirmPassword} required />
                        <label>confirmPassword *</label>
                    </div>
                    <input type="submit" onClick={this.handelSubmit} value="Reset Password" />
                </form>                
            </div>                
            {this.props.email !== null && this.props.email !== undefined ?this.props.email.statusCode === 200? NotificationManager.success(this.props.email.message, 'Success'): null:null}
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        email: storeState.resetPasswordState.email
    }
}

export default connect(mapStateToProps, {resetPasswordUser})(ResetPassword)
