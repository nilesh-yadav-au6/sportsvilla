import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUserOrder } from '../redux/actions/userProfileAction'
import UserOrderPageList from '../components/UserOrderPageList'
import '../Styles/Userdashboard.css'
class UserOrderPage extends Component {

    componentDidMount(){
        this.props.getUserOrder()
    }

    render() {
        return (
            <div>
                {  this.props.user!==null?
            <div style={{display: "flex", flexDirection: "row",}} >
            <div style={{ display: "flex", flexDirection: "column", width: '100vw', alignItems: "flex-start" }} >
                {this.props.orders !==null && this.props.orders.length !== 0 ? this.props.orders.map((order , index) => <UserOrderPageList  key={index} order={order} {...this.props} />)  :
                    <div className={'mainPop'} >
                        <h1>NO Order placed yet</h1>
                    </div> }
            </div>
            </div>: <Redirect to='/signin' /> }
            </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        orders:storeState.userState.orders
    }
}

export default  connect(mapStateToProps, { getUserOrder })(UserOrderPage)
