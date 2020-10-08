import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ConfirmUSer } from '../redux/actions/confrimEmailAction'
import {Link} from 'react-router-dom'
import style from '../Styles/Cartpage.module.css'

class ConfirmEmail extends Component {
    
    componentDidMount(){
        this.props.ConfirmUSer(this.props.match.params.confirmToken)
    }

    render() {
        return (
            this.props.email !== null?
            <div>
            <div className={style.popup} >
                    <div className={style.mainPop} >
                        <h1>Email confirmed successfully...!!!</h1>
                        <h2>You can<Link to="/signin" >Sign in </Link> now</h2>
                    </div>
                </div>
            </div>: 
            <div className={style.popup} >
                    <div className={style.mainPop} >
                        <h1>Email Already confirmed</h1>
                        <h2>You can <Link to="/signin" >Sign in </Link> now</h2>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = storeState => {
    return {
        email: storeState.confirmEmailState.email
    }
}

export default connect(mapStateToProps, {ConfirmUSer})(ConfirmEmail)
