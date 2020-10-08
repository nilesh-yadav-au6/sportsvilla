import React, { Component } from "react";
import profileimage from "../images/profilepic.png"
import EditPage from "../components/EditProfileUser"
import ChangePassword from "../components/ChangePassword"
import "../Styles/Userdashboard.css"
import  { connect } from "react-redux"
import { getUser } from "../redux/actions/userProfileAction"
import "../Styles/EditProfile.css"
import UserOrderPage from "../pages/UserOrderPage"


class UserDashboard extends Component {

    componentDidMount(){
      this.props.getUser()
    }


    state = {
        showPopup: false,
        showOrders:false,
        showChangePassword:false
      };


      togglePopup = () => {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

      toggleOrder = () => {
        this.setState({
          showOrders: !this.state.showOrders
        });
      }
      toggleChangePassword = () => {
        this.setState({
          showChangePassword: !this.state.showChangePassword
        });
      }
  render() {
    return (
      <div style={{minHeight: "80vh"}} >
          {this.props.user !== null   ?  <div>
              <div className="profile">
                <button className={"no-focusborder"} style={{float:"right"}} onClick={this.togglePopup}>Edit Profile</button>
                <button className={"no-focusborder"} style={{float:"right"}} onClick={this.toggleOrder}>Orders</button>
                {this.props.user.isThirdParty === true ? <button className={"no-focusborder"} style={{float:"right"}} disabled onClick={this.toggleChangePassword}>Change Password</button> :<button className={"no-focusborder"} style={{float:"right"}} onClick={this.toggleChangePassword}>Change Password</button>}
                <div><h1>{this.props.user.name}</h1></div>
                <img
                  style={{ width: "200px", height: "300px" ,objectFit:"contain"}}
                  src={!this.props.user.profilePic ?  profileimage : this.props.user.profilePic}
                  alt="profilepic"
                />
              </div>
            </div> :  null}
        <div className="editprofile">
        {this.state.showPopup ? 
          <EditPage
            closePopup={this.togglePopup} {...this.props}
          />
          : null
        }
        {this.state.showChangePassword ? 
            <>
            <ChangePassword closePopup={this.toggleChangePassword} / >
            </>
          : null
        }
        {this.state.showOrders ? 
          <UserOrderPage />
          : null
        }
        </div>
      </div>
    );
  }
}


const mapStateProps = (storeState) => {
  return {
    user : storeState.userState.user
  }
}

export default connect(mapStateProps , {getUser})(UserDashboard);
