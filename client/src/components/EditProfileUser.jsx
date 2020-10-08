import React, { Component } from "react";
import { editUserProfile } from "../redux/actions/userProfileAction";
import { connect } from "react-redux";

class EditProfileUser extends Component {
  state = {
    name: "",
    image: null,
  };

  handelChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handelFile = (e) => {
    const image = e.target.files[0];
    this.setState({ image });
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.props)
    const { name, image } = this.state;
    if (name !== undefined) {
      this.props.editUserProfile({ image, name });
    } else {
      this.props.editUserProfile({ image });
    }
    this.props.closePopup();
    setTimeout(()=>{
      this.props.getUser()
    }, 2000)
  };

  close = () => {
    this.props.closePopup()
  }

  render() {
    return (
      <div className="popup">
        <div className="box">
          <div className="heading">
            <h2>Update Profile</h2>
            <div onClick={this.close} style={{ marginLeft: "100px" }}>
              X
            </div>
          </div>
          <form style={{ marginTop: "25px" }}>
            <div className="inputBox">
              <input
                type="text"
                name="name"
                onChange={this.handelChange}
                value={this.state.name}
                className="input"
                placeholder="Name"
              />
              <label>Name</label>
            </div>
            <div className="inputBox">
              <input
                type="file"
                name="image"
                onChange={this.handelFile}
                multiple
              />
              <label>Profile Picture</label>
            </div>

            <input type="submit" onClick={this.onSubmit} value="Change" />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { editUserProfile })(EditProfileUser);
