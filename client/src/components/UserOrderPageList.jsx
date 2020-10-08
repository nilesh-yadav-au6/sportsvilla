import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartAction, removeCartAction, incrementCartAction, decrementCartAction } from '../redux/actions/addCartAction'

export class cartListItem extends Component {

    render() {
        return (
            <div style={{width:"70%" , background:"lightgray" ,margin:"15px auto"}}>
                {this.props.order.type === 'product'?
            <div style={{display: "flex", flexDirection: "row", justifyContent:"space-around" ,width:"100%" , marginTop:"20px" ,border:"1px solid lightgray"}} >
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: '300px' }} >
                    <img style={{width: '200px', height: '200px'}} src={this.props.order.image} alt="Product"/>
                </div>
                <div style={{display: "flex", flexDirection: "column"}} >
                    <h5>{this.props.order.productName}</h5>
                    <h6>{this.props.order.brand}</h6>
                    <h6>Quantity: {this.props.order.quantity}</h6>
                    <h6>Order Total: {this.props.order.order_value/100}</h6>
                </div>
            </div>
            :this.props.order.type === 'schedule'? 
            <div style={{display: "flex", flexDirection: "row",justifyContent:"space-around", width:"100%" , marginTop:"20px" ,border:"1px solid lightgray" }} >
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: '300px' }} >
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center" }} >
                        <img style={{width: '150px', height: '150px'}} src={this.props.order.team1ImageUrl} alt="Product"/>
                        <img style={{width: '150px', height: '150px'}} src={this.props.order.team2ImageUrl} alt="Product"/>
                    </div>
                </div>
                
                <div style={{display: "flex", flexDirection: "column"}} >
                    <h5>{this.props.order.team1} VS {this.props.order.team2}</h5>
                    <h6>Date : {this.props.order.matchDate}</h6>
                    <h6>Place: {this.props.order.matchPlace}</h6>
                    <h6>Quantity: {this.props.order.quantity}</h6>
                    <h6>Order Total: {this.props.order.order_value/100}</h6>
                </div>
            </div>
            :null}
            </div>
        )
    }
}

export default connect( null, { getCartAction, removeCartAction, incrementCartAction, decrementCartAction } )(cartListItem)
