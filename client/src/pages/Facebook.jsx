import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { facebookAction } from '../redux/actions/loginAction'
import { connect } from 'react-redux'

class Facebook extends Component {
    componentDidMount(){
        this.props.facebookAction(this.props.location.search)
    }

    render() {
        return (
            <Redirect to='/dashboard' />
        )
    }
    
}

export default connect(null, {facebookAction})(Facebook)
