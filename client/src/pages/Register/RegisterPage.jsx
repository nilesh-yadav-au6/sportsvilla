import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RegisterPage.css'
import { connect } from 'react-redux'
import { fetchUser } from '../../redux/actions/registerAction'
import { NotificationManager } from 'react-notifications';

class RegisterPage extends Component {
    state = {
        name: "",
        email: "",
        password: "",
    }

    handelChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handelSubmit = e => {
        e.preventDefault()
        this.props.fetchUser({...this.state})
    }

    render() {
        return (
            <div className='parentDiv'>
            <div className="box" >
                <div className='heading' >
                    <h2>
                        Create an account
                    </h2>
                    <h2 style={{ marginLeft: '5px', marginRight: '5px' }}>or</h2>
                    <span><Link to='/signin' > Sign In</Link> </span>
                </div>
                <p>Use your Google Account</p>
                <form>
                    {console.log(this.props.error)}
                    {this.props.error !== [] && this.props.error !== undefined ?this.props.error.map(er=>er.param ==='unauthourize'?<p  style={{color: 'red', marginLeft: 10, marginBottom: 20}} >{er.msg}</p>: null):null}
                    <div className='inputBox'>
                        <input type="text" name='name' onChange={this.handelChange} value={this.state.name} required />
                        <label>Username</label>
                        {this.props.error !== [] && this.props.error !== undefined ?this.props.error.map((er, i)=>er.param ==='name'?<small key={i} style={{color: 'red', display: 'block', textAlign: 'left', marginLeft: 10, marginBottom: 20}} >{er.msg}</small>: null):null}
                    </div>
                    <div className='inputBox'>
                        <input type="email" name='email' onChange={this.handelChange} value={this.state.email} required />
                        <label>Email</label>
                        {this.props.error !== [] && this.props.error !== undefined ?this.props.error.map((er, i)=>er.param ==='email'?<small key={i} style={{color: 'red', display: 'block', textAlign: 'left', marginLeft: 10, marginBottom: 20}} >{er.msg}</small>: null):null}
                    </div>
                    <div className='inputBox'>
                        <input type="password" name='password' onChange={this.handelChange} value={this.state.password} required />
                        <label>Password</label>
                        {this.props.error !== [] && this.props.error !== undefined ?this.props.error.map((er, i)=>er.param ==='password'?<small key={i} style={{color: 'red', display: 'block', textAlign: 'left', marginLeft: 10, marginBottom: 20}} >{er.msg}</small>: null):null}
                    </div>
                    <input type="submit" onClick={this.handelSubmit} value="Sign up" />
                </form>
                {this.props.user!==null && this.props.error !== undefined? NotificationManager.success(this.props.user.confirmation, 'Success') : null}                
            </div>
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.registerState.user,
        error: storeState.registerState.error
    }
}


export default connect(mapStateToProps, {fetchUser})(RegisterPage)
