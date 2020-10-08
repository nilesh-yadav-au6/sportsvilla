import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Addproduct from '../components/AddProduct'
import Managementdashboard from "../components/ManagementDashboard"
import { getCartAction } from '../redux/actions/addCartAction'

export class Dashboard extends Component {
    componentDidMount(){
        this.props.getCartAction()
    }
    render() {
        return (
            this.props.user!==null?this.props.user.data.commenUser.role==='Admin'? <Addproduct />:
            this.props.user.data.commenUser.role==='User'? <Redirect to='/products' /> : <Managementdashboard />
            :<Redirect to='/signin'/>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
    }
}

export default connect(mapStateToProps, {getCartAction})(Dashboard)
