import React, { Component } from "react";
import { connect } from "react-redux";
import { changePassword } from "../redux/actions/userProfileAction";
import "../Styles/ChangePassword.css";

class ChangePassword extends Component {
  state = {
    email: "",
    newPassword: "",
    oldPassword: "",
  };

  handelChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, newPassword, oldPassword } = this.state;
    this.props.changePassword({ email, newPassword, oldPassword });
    this.props.closePopup();
  };

  close = (e) => {
      this.props.closePopup()
  }

  render() {
    return (
      <div className="popup">
        <div className="box">
          <div className="heading">
            <h2>Change Password</h2>
          <div onClick  ={this.close} style={{marginLeft:"100px"}}>X</div>
          </div>
          <form style={{marginTop:"25px"}}>
            <div className="inputBox">
              <input
                type="email"
                name="email"
                onChange={this.handelChange}
                value={this.state.email}
                className="input"
              />
              <label style={{ color: "darkgray" }}>Email *</label>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="oldPassword"
                onChange={this.handelChange}
                value={this.state.oldPassword}
              />
              <label style={{ color: "darkgray" }}>Old Password</label>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="newPassword"
                onChange={this.handelChange}
                value={this.state.newPassword}
              />
              <label style={{ color: "darkgray" }}>New Password</label>
            </div>
            <input type="submit" onClick={this.onSubmit} value="Change" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { changePassword })(ChangePassword);
