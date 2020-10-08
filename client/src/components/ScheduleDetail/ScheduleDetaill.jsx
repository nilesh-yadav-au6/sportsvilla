import React, { Component } from "react";
import { connect } from "react-redux";
import { singleSchedule, fetchSchdule, deleteScheduleAdmin, updateScheduleAdminAction } from "../../redux/actions/scheduleAction";
import style from "./ScheduleDetaill.module.css";
import { CardTitle, CardBody, Collapse } from "reactstrap";
import axios from 'axios'
import { addCartAction, getCartAction } from '../../redux/actions/addCartAction'
import { NotificationManager } from 'react-notifications';

class ScheduletDetaill extends Component {
  
  state ={
    razorpay: null,
    isSchedule: false,
    matchType: "", matchDate: "", matchPlace: "", team1: "", team2: "", capacity: "", image: "", price: "",
    toggleDelete: false,
  }
  
  componentDidMount() {
    const scheduleId = this.props.match.params.scheduleId;
    this.props.singleSchedule(scheduleId);
  }

  toggleSchedule = () => this.setState({ isSchedule: !this.state.isSchedule })

  handleClick = async (e) =>{
    if(this.props.user !== null){
      e.preventDefault();
      const orderUrl = `https://sports-vella.herokuapp.com/order/${this.props.match.params.scheduleId}`;
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
            this.props.history.push(`/schedules`)
          } catch (err) {
            console.log(err);
          }
        }
      }
      this.setState({"razorpay": new window.Razorpay(options)})
      this.state.razorpay.open();
    }
    else if(this.props.user===null){
      this.props.history.push('/signin')
    }
  }

  handelAddCart = () => {
    const productId = this.props.match.params.scheduleId;
    try{
      if(this.props.user===null){
        this.props.history.push('/signin')
      }
      else if(this.props.user!==null){
        this.props.addCartAction(productId);
      }
    }catch(err){
      console.error(err)
    }finally{
      setTimeout(()=>{ this.props.getCartAction() }, 1000)
    }
  } 

  handelChange = e => {
      this.setState({ [e.target.name]: e.target.value })
  }

  handelMultipleFile = e =>{
      const image = e.target.files
      this.setState({ image })
  }

  handelAddSchedules = e =>{
    const productId = this.props.match.params.scheduleId;
    try{
      e.preventDefault()
      const {matchType, matchDate, matchPlace, team1, team2, capacity, image, price} = this.state
      this.props.updateScheduleAdminAction({matchType, matchDate, matchPlace, team1, team2, capacity, image, price, productId})
    }catch(err){
      console.error(err)
    }finally{
      setTimeout(()=>{
        this.props.singleSchedule(productId)
      }, 8000)
    }
  }

  handelDeleteToggle = () => {
    this.setState({ toggleDelete: !this.state.toggleDelete })
  }

  handelDeleteSchedule = () =>{
  try{
    const productId = this.props.match.params.scheduleId;
    this.props.deleteScheduleAdmin(productId)
  }catch(err){
    console.error(err)
  }finally{
    setTimeout(()=>{
      this.props.fetchSchdule(1,3)
      this.props.history.push('/schedules')
    }, 1000)
  }
}

  render() {
    return (
      <div>
        {this.props.schedule !==null ? <div className={style.card_div}>
      <span>
        <img
          className={style.image_Card}
          src={this.props.schedule.team1ImageUrl}
          alt='teamName'
        />
        <span>VS</span>
        <img
          className={style.image_Card}
          src={this.props.schedule.team2ImageUrl}
          alt='oppTeam'
        />
      </span>
      <CardBody>
        <CardTitle>Date : {this.props.schedule.matchDate}</CardTitle>
        <CardTitle>Place : {this.props.schedule.matchPlace}</CardTitle>
        <CardTitle>Capacity : {this.props.schedule.capacity}</CardTitle>
        <CardTitle>Ticket Price : {this.props.schedule.price}</CardTitle>
        {this.props.user!==null && this.props.user.data.commenUser.role==='User'?
        <button className={"no-focusborder"} onClick={this.handleClick} >Buy Ticket </button>:
        <button className={"no-focusborder"} disabled >Buy Ticket </button>}
        <button className={"no-focusborder"} onClick={this.handelAddCart} >Add To Cart</button>
        {this.props.user!==null && this.props.user.data.commenUser.role==='Admin'?
        <>
        <button className={"no-focusborder"} onClick={this.toggleSchedule} >Update Schedule</button>
        <button className={"no-focusborder"} onClick={this.handelDeleteToggle} >Delete Schedule</button>
        {this.state.toggleDelete?
        <div className={style.popup} >
          <div className={style.mainPop} > 
            <h4>Are you Sure ?</h4>
            <button className={"no-focusborder"} onClick={this.handelDeleteToggle} > cancel </button> 
            <button className={"no-focusborder"} color="danger" onClick={ this.handelDeleteSchedule } >Delete</button>
          </div>
        </div>:null}
        <Collapse isOpen={this.state.isSchedule}>
          <div className="input-fields">
              <form encType='multipart/form-data' onSubmit={this.handelAddSchedules} >
                  <input type="date" name='matchDate' onChange={this.handelChange} value={this.state.matchDate} className="input" placeholder="Match Date" />
                  <input type="text" name='matchType' onChange={this.handelChange} value={this.state.matchType} className="input" placeholder="Match Type" />
                  <input type="text" name='matchPlace' onChange={this.handelChange} value={this.state.matchPlace} className="input" placeholder="Match Place" />
                  <input type="text" name='team1' onChange={this.handelChange} value={this.state.team1} className="input" placeholder="Team 1" />
                  <input type="text" name='team2' onChange={this.handelChange} value={this.state.team2} className="input" placeholder="Team 2" />
                  <input type="text" name='capacity' onChange={this.handelChange} value={this.state.capacity} className="input" placeholder="Capacity" />
                  <input type="text" name='price' onChange={this.handelChange} value={this.state.price} className="input" placeholder="Price" />
                  <input type="file" name='image' onChange={this.handelMultipleFile} multiple />
                  <button className={"no-focusborder"} type='submit' >Add</button>
              </form>
          </div>
        </Collapse>
        </>
        :null}
      </CardBody>
    </div>: <div className={style.loader}>Loading...</div>}  
      </div>
      
    );
  }
}

const mapStateProp = (stateStore) => {
  return {
    schedule: stateStore.scheduleState.singleSchedule,
    user: stateStore.loginState.user,
  };
};

export default connect(mapStateProp, {singleSchedule, addCartAction, fetchSchdule, deleteScheduleAdmin, updateScheduleAdminAction, getCartAction })(ScheduletDetaill);
