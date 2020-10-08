import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPendingOrd } from '../redux/actions/pendingOrdAction'
import PendingOrdItem from '../components/pendingOrderItem'
import style from './Products/Products.module.css'

class PendingOrder extends Component {
    componentDidMount(){
        this.props.getPendingOrd()
    }
    render() {
        return (
            <div style={{display: "flex", minHeight: "50vh", flexDirection: "row", justifyContent: "space-around", flexWrap: 'wrap'}} >
                {this.props.pendingOrd!=null && this.props.pendingOrd.length!==0 ?this.props.pendingOrd.map(ord => <PendingOrdItem key={ord._id} ordProps={ord} {...this.props} /> ):null}
                {this.props.fetching === true ?<div className={style.loader}>Loading...</div>:null}
            </div>
        )
    }
}

const mapStateToProp = (storeState) =>{
    return {
        pendingOrd: storeState.pendingOrderState.orders,
        fetching: storeState.pendingOrderState.isFetching
    }
}

export default connect(mapStateToProp, {getPendingOrd})(PendingOrder)
