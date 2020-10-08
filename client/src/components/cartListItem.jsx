import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCartAction, removeCartAction, incrementCartAction, decrementCartAction } from '../redux/actions/addCartAction'

export class cartListItem extends Component {

    handelRemoveClick = e => {
        e.preventDefault()
        try{
            this.props.removeCartAction(e.target.id)
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{this.props.getCartAction()}, 1000)
        }
    }

    handelIncrementClick = e => {
        e.preventDefault()
        try{
            this.props.incrementCartAction(e.target.id)
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{ this.props.getCartAction()}, 1000)   
        }
    }

    handelDecrementClick = e => {
        e.preventDefault()
        try{
            this.props.decrementCartAction(e.target.id)
        }catch(err){
            console.error(err)
        }finally{
            setTimeout(()=>{this.props.getCartAction()}, 1000)
        }
    }

    render() {
        return (
            this.props.cartProp.type === 'product'?
            <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start", width: "70vw", border: "2px solid white", borderRadius: "25px" }} >
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: '300px', padding: "20px" }} >
                    <img style={{width: '200px', height: '200px'}} src={this.props.cartProp.image} alt="Product"/>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "20px" }} >
                        <button className={"no-focusborder"} onClick={this.handelIncrementClick} id={this.props.cartProp.productId}
                        style={{width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", }} >+</button>
                            <div style={{width: "20px", textAlign: "center", fontSize: "1.5rem" }} >{this.props.cartProp.quantity}</div>
                        <button className={"no-focusborder"} onClick={this.handelDecrementClick} id={this.props.cartProp.productId}
                        style={{width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", }} >-</button>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", marginLeft: "100px", padding: "20px"}} >
                    <h5>{this.props.cartProp.productName}</h5>
                    <h6>{this.props.cartProp.brand}</h6>
                    <h6>Price: {this.props.cartProp.price}</h6>
                    <h6>Order Total: {this.props.cartProp.orderTotal}</h6>
                    <button className={"no-focusborder"} onClick={this.handelRemoveClick} style={{width: '200px', background: "#0dd3ff", borderRadius: "25px", color: "white", }} id={this.props.cartProp.productId} >Remove Item</button>
                </div>
            </div>
            :this.props.cartProp.type === 'schedule'? 
            <div style={{display: "flex", flexDirection: "row", alignItems: "flex-start", width: "70vw", border: "2px solid white", borderRadius: "25px" }} >
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: '300px', padding: "20px" }} >
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center" }} >
                        <img style={{width: '150px', height: '150px'}} src={this.props.cartProp.team1ImageUrl} alt="Product"/>
                        <img style={{width: '150px', height: '150px'}} src={this.props.cartProp.team2ImageUrl} alt="Product"/>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", padding: "20px" }} >
                        <button className={"no-focusborder"} onClick={this.handelIncrementClick} id={this.props.cartProp.productId} 
                        style={{width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", }}>+</button>
                        <div style={{width: "20px", textAlign: "center", fontSize: "1.5rem" }} >{this.props.cartProp.quantity}</div>
                        <button className={"no-focusborder"} onClick={this.handelDecrementClick} id={this.props.cartProp.productId} 
                        style={{width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", }}>-</button>
                    </div>
                </div>
                
                <div style={{display: "flex", flexDirection: "column"}} >
                    <h5>{this.props.cartProp.team1} VS {this.props.cartProp.team2}</h5>
                    <h6>{this.props.cartProp.matchDate}</h6>
                    <h6>Place: {this.props.cartProp.matchPlace}</h6>
                    <h6>Price: {this.props.cartProp.price}</h6>
                    <h6>Order Total: {this.props.cartProp.orderTotal}</h6>
                    <button className={"no-focusborder"} onClick={this.handelRemoveClick} style={{width: '200px', background: "#0dd3ff", borderRadius: "25px", color: "white", }} id={this.props.cartProp.productId} >Remove Item</button>
                </div>
            </div>
            :null
        )
    }
}

export default connect( null, { getCartAction, removeCartAction, incrementCartAction, decrementCartAction } )(cartListItem)
