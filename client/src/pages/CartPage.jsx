import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getCartAction } from '../redux/actions/addCartAction'
import CartListItem from '../components/cartListItem'
import { Link } from 'react-router-dom'
import axios from 'axios'
import style from '../Styles/Cartpage.module.css'

import { NotificationManager } from 'react-notifications';

class CartPage extends Component {

    componentDidMount(){
        this.props.getCartAction()
    }

    handelCheckOut = async e =>{
        console.log('I am getting clicked')
        e.preventDefault();
        if(this.props.user!==null){
            const orderUrl = `https://sports-vella.herokuapp.com/cart/order`;
            const pendingOrd = `https://sports-vella.herokuapp.com/pendingOrder`
            const User = localStorage.getItem('user')
            const res = JSON.parse(User)
            const dat = res.data
            const token = dat.accessToken
            const response = await axios.post(orderUrl, {},{
            headers:{
                Authorization : token
            }
            });
            const { data } = response;
            console.log(data, 1234, 'fromhere')
            const options = {
            key: process.env.RAZORPAY_APT_KEY,
            order_id: data.orderId,
            amount:data.amount,
            handler: async (response) => {
                try {
                await axios.post(pendingOrd, {amount:data.amount, currency: 'INR', ...response},{
                    headers:{
                    Authorization : token
                    }
                });
                NotificationManager.success('Order placed successfully', 'Success')
                this.props.history.push(`/products`)
                } catch (err) {
                console.log(err);
                }
            }
            }
            this.setState({"razorpay": new window.Razorpay(options)})
            this.state.razorpay.open();
        }else if(this.props.user===null){
            this.props.history.push('/signin')
        }
    }

    render() {
        return (         
            this.props.user!==null?
            <>
            {this.props.cartState.length === 0 && this.props.cartS.isFetching !==true ?
                    <div className={style.popup} >
                        <div className={style.mainPop} >
                            <h1>Cart is Empty</h1>
                            <h2><Link to="/products" style={{color: "white"}} >Shop now</Link></h2>
                        </div>
                    </div>
                // </div>
            :null}
            <div style={{display: "flex", flexDirection: "row",  }} >
            <div style={{ display: "flex", flexDirection: "column", width: '70vw', alignItems: "flex-start", margin: "20px", background: "#40B4E5", boxSizing: "border-box" }} >
                {this.props.cartState !==null && this.props.cartState.length !== 0 ? this.props.cartState.map(cartI => <CartListItem    key={cartI._id} cartProp={cartI} {...this.props} />):this.props.cartS.isFetching===true? <div className={style.loader}>Loading...</div>: null }
            </div>
            {this.props.cartState !==null && this.props.cartState.length !== 0 ?<div style={{ display: "flex", flexDirection: "column", width: '30vw', alignItems: "flex-start", margin: "20px", maxHeight: "250px", background: "#40B4E5", boxSizing: "border-box"}} >
                <div style={{width: "100%", height: "100%", border: "2px solid white", paddingLeft: "20px", paddingTop: "20px", borderRadius: "25px"}} >
                    <h3>Price Detail</h3>
                    <h4>Total Items: {this.props.cartS.itemT} </h4>
                    <h4>Total Amount: {this.props.cartS.price} </h4>
                    {this.props.user!==null && this.props.user.data.commenUser.role==='User'?
                    <button className={"no-focusborder"} onClick={this.handelCheckOut}  style={{width: '300px', background: "#0dd3ff", borderRadius: "25px", color: "white",}} > CheckOut </button>:
                    <button className={"no-focusborder"} disabled style={{width: '300px', background: "#0dd3ff", borderRadius: "25px", color: "white",}} > CheckOut </button>}
                </div>
            </div>: this.props.cartS.isFetching===true? <div className={style.loader}>Loading...</div>: null}
            </div>
            </>
            : <Redirect to='/signin' /> 
        )
    }
}

const mapStateToProps = storeState => {
    return {
        user: storeState.loginState.user,
        cartState: storeState.getCartState.cart,
        cartS: storeState.getCartState
    }
}

export default  connect(mapStateToProps, { getCartAction })(CartPage)
