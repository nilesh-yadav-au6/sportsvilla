import React, { Component } from 'react'
import style from "../Styles/NavBar.module.css";
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <>
                <Link to='/players' style={{ color: 'white' }} className={style.myLink} >Player Pool</Link>
                <Link to='/pending' style={{ color: 'white' }} className={style.myLink} >PendingOrder</Link>
            </>
        )
    }
}

export default NavBar
