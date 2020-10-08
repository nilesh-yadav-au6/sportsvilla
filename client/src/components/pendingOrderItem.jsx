import React from 'react'
import { CardTitle, CardBody } from "reactstrap";
import axios from 'axios'
import { getPendingOrd } from '../redux/actions/pendingOrdAction'
import { connect } from 'react-redux'

const pendingOrderItem = (props) => {
    const {ordProps} = props
    const handelClick = async () => {
        const User = localStorage.getItem('user')
        const res = JSON.parse(User)
        const dat = res.data
        const token = dat.accessToken    
        await axios.post('https://sports-vella.herokuapp.com/verify',{...ordProps}, {
            headers:{
                Authorization : token
            }
        })
        props.getPendingOrd()
    }
    return (
        <div>
        <CardBody>
            <CardTitle>Price : {ordProps.amount/100}</CardTitle>
        <button className={"no-focusborder"} onClick={handelClick} >Verify</button>
        </CardBody>
        </div>
    )
}

export default connect(null, {getPendingOrd})(pendingOrderItem)
