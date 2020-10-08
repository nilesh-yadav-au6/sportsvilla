import React, { Component } from "react";
import { connect } from "react-redux";
import { singleHofPlayer ,deleteHOFPlayer ,updatePlayerHOF } from "../../redux/actions/hofAuction";
import style from "./HofDetaill.module.css";
import {  Collapse } from "reactstrap";

export class HofDetaill extends Component {
  componentDidMount() {
    this.props.singleHofPlayer(this.props.match.params.hofPlayerId);
  }

  state ={
    toggleDelete: false,
    isPlayerOpen: false,
    image: "",
    name: "",  country: "", battingStyle: "", bowlingStyle: "", speciality: "",dob:"" , debut:"", inducted:"", testRuns:"", odiRuns:"", career:"",playerBio:"",hundreds:""
  }

  handelChange = e => {
    e.preventDefault()
    this.setState({[e.target.name]:e.target.value})

  }

  handelDeleteToggle = () => {
    this.setState({ toggleDelete: !this.state.toggleDelete })
  }

  toggleProduct = () => this.setState({ isPlayerOpen: !this.state.isPlayerOpen });

  handelSingleFile = e => {
    const image = e.target.files[0]
    this.setState({ image })
  }

  handelDeletePlayer = () =>{
    try{  
      const hofPlayerId = this.props.match.params.hofPlayerId;
      this.props.deleteHOFPlayer(hofPlayerId)
    }catch(err){
      console.error(err)
    }finally{
      setTimeout(()=>{
        this.props.history.push("/hofplayers")
      }, 1000)
    }
  }


  handelAddPlayerHOF = e => {
    try{
      e.preventDefault()
      const productId = this.props.match.params.hofPlayerId
      const { image ,name,  country, battingStyle, bowlingStyle, speciality,dob , debut, inducted, testRuns, odiRuns, career,playerBio,hundreds } = this.state
      this.props.updatePlayerHOF({image ,name,  country, battingStyle, bowlingStyle, speciality,dob , debut, inducted, testRuns, odiRuns, career,playerBio,hundreds} , productId)
      this.setState({ isPlayerOpen: !this.state.isPlayerOpen });
    }catch(err){
      console.error(err)
    }finally{
      const productId = this.props.match.params.hofPlayerId;
      setTimeout(()=>{
        this.props.singleHofPlayer(productId);
      }, 5000) 
    }
  }

  render() {
    return (
      <div className={style.mainDivHof}>
        {this.props.user !== null &&
        this.props.user.data.commenUser.role === "Admin" ? (
          <>
            <div style={{textAlign: "center", margin: "20px"}}>
              <button className={"no-focusborder"} onClick={this.toggleProduct}>Update Product</button>
              <button className={"no-focusborder"} onClick={this.handelDeleteToggle}>Delete</button>
            </div>
            {this.state.toggleDelete ? 
              <div className={style.popup}>
                <div className={style.mainPop}>
                  <h4 style={{textAlign: "center"}} >Are you Sure ?</h4>
                  <div style={{textAlign: "center"}}>
                    <button className={"no-focusborder"} onClick={this.handelDeleteToggle}> cancel </button>
                    <button className={"no-focusborder"} color="danger" onClick={this.handelDeletePlayer}>
                    Delete
                  </button>
                  </div>
                </div>
              </div>
            : null}
            <Collapse isOpen={this.state.isPlayerOpen}>
              <div className="input-fields">
              <form encType='multipart/form-data' onSubmit={this.handelAddPlayerHOF} >
                  <input type="text" name='name' onChange={this.handelChange} value={this.state.name} className="input" placeholder="Name" />
                  <input type="date" name='dob' onChange={this.handelChange} value={this.state.dob} className="input" placeholder="Date Of Birth" />
                  <input type="text" name='country' onChange={this.handelChange} value={this.state.country} className="input" placeholder="Country" />
                  <input type="text" name='battingStyle' onChange={this.handelChange} value={this.state.battingStyle} className="input" placeholder="Batting Style" />
                  <input type="text" name='bowlingStyle' onChange={this.handelChange} value={this.state.bowlingStyle} className="input" placeholder="Bowling Style" />
                  <input type="text" name='speciality' onChange={this.handelChange} value={this.state.speciality} className="input" placeholder="Speciallity" />
                  <input type="text" name='inducted' onChange={this.handelChange} value={this.state.inducted} className="input" placeholder="Inducted" />
                  <input type="text" name='hundreds' onChange={this.handelChange} value={this.state.hundreds} className="input" placeholder="Hundreds OR Best Figures" />
                  <input type="text" name='debut' onChange={this.handelChange} value={this.state.debut} className="input" placeholder="Debut Year" />
                  <input type="text" name='career' onChange={this.handelChange} value={this.state.career} className="input" placeholder="Career Span" />
                  <input type="text" name='playerBio' onChange={this.handelChange} value={this.state.playerBio} className="input" placeholder="Player Bio" />
                  <input type="number" name='testRuns' onChange={this.handelChange} value={this.state.testRuns} className="input" placeholder="Test Runs Or Test Wickets" />
                  <input type="number" name='odiRuns' onChange={this.handelChange} value={this.state.odiRuns} className="input" placeholder="ODI Runs Or ODI Wickets" />
                  <input type="file" name="image" onChange={this.handelSingleFile}/>
                  <button className={"no-focusborder"} type='submit' >Update</button>
              </form>
              </div>
            </Collapse>
          </>
        ) : null}
        {this.props.hofPlayer !== null ? (
          <>
            <div className={style.inner}>
              <div>
                <img
                  src={this.props.hofPlayer.image}
                  alt="player"
                  srcset=""
                  className={style.imageDiv}
                />
              </div>
              <div className={style.content1}>
                <p className={style.ptag}>
                  Name : {this.props.hofPlayer.name}{" "}
                </p>
                <p className={style.ptag}>
                  Inducted : {this.props.hofPlayer.inducted}{" "}
                </p>
                <p className={style.ptag}>
                  Career : {this.props.hofPlayer.career}{" "}
                </p>

                {this.props.hofPlayer.speciality === "BATTER" ? (
                  <>
                    <p className={style.ptag}>
                      Test Runs : {this.props.hofPlayer.testRuns}{" "}
                    </p>
                    <p className={style.ptag}>
                      ODI Runs : {this.props.hofPlayer.odiRuns}{" "}
                    </p>
                    <p className={style.ptag}>
                      Hundreds : {this.props.hofPlayer.hundreds}{" "}
                    </p>{" "}
                  </>
                ) : (
                  <>
                    {" "}
                    <p className={style.ptag}>
                      Test Wickets : {this.props.hofPlayer.testRuns}{" "}
                    </p>
                    <p className={style.ptag}>
                      ODI Wickets : {this.props.hofPlayer.odiRuns}{" "}
                    </p>
                    <p className={style.ptag}>
                      Best Figures : {this.props.hofPlayer.hundreds}{" "}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 style={{ margin: "0 3rem" }}>
                <strong>Player Bio</strong>
              </h3>
              <p style={{ margin: "2rem 3rem", color: "#330066" }}>
                {this.props.hofPlayer.playerBio}
              </p>
            </div>
            <div className={style.content2}>
              <p className={style.ptag}>
                DATE OF BIRTH : {this.props.hofPlayer.dob}{" "}
              </p>
              <p className={style.ptag}>
                ROLE : {this.props.hofPlayer.speciality}{" "}
              </p>
              <p className={style.ptag}>
                BATTING STYLE : {this.props.hofPlayer.battingStyle}{" "}
              </p>
              <p className={style.ptag}>
                BOWLING STYLE : {this.props.hofPlayer.bowlingStyle}{" "}
              </p>
              <p className={style.ptag}>
                DEBUT : {this.props.hofPlayer.debut}{" "}
              </p>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

const mapStateProps = (storeState) => {
  return {
    hofPlayer: storeState.hofPlayerState.singleHofPlayer,
    user: storeState.loginState.user
  };
};

export default connect(mapStateProps, { singleHofPlayer ,deleteHOFPlayer, updatePlayerHOF })(HofDetaill);
