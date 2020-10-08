import './Range.css'

import React, { Component } from 'react'

export class Range extends Component {
    state ={
        amount: 0
    }

    handelChange = e => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.amount)
    }

    render() {
        return (
            <div className="range-wrap">
                <input type="range" name="amount" onChange={this.handelChange}  min={0} max={100} value={this.state.amount} className="range" />
            </div>
        )
    }
}

export default Range

