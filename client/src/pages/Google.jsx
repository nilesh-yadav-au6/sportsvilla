import React, { Component } from 'react'
import { connect } from 'react-redux'
import {googleAction } from '../redux/actions/loginAction'
import { Redirect } from 'react-router-dom'
class Google extends Component {
    componentDidMount(){
        this.props.googleAction(this.props.location.search)
    }
    render() {
        return (
            <Redirect to='/dashboard' />
        )
    }
}

export default connect(null, { googleAction }) (Google)
