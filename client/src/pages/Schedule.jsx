import React ,{ Component} from 'react'
import { connect } from "react-redux"
import { fetchSchdule, fetchSearchSchdule } from "../redux/actions/scheduleAction"
import ScheduleList from "../components/ScheduleListItem/ScheduleList"
import style from './Products/Products.module.css'
import { NotificationManager } from 'react-notifications';

class ScheduleReducer extends Component{
    state = {
      matchDate: ""
    }
    
    componentDidMount(){
      this.props.fetchSchdule(1, 3)
    }

    pagination = e => {
      console.log(e.target.value)
      this.props.fetchSchdule(e.target.value, 3)
    }

    handelSubmit = e =>{
      e.preventDefault()
      if(!this.state.matchDate){
        NotificationManager.error("Bad Request", 'Error')
      }
      this.props.fetchSearchSchdule(1, 3, this.state.matchDate)
    }

    handelChange = e =>{
      this.setState({ [e.target.name]: e.target.value})
    }
    
    render(){
        return (
          <div>
            <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "center"}}>
              <form onSubmit={this.handelSubmit} >
                <input onChange={this.handelChange} style={{border: "none", margin: "20px"}} type="date" name="matchDate" vaule={this.state.matchDate}/>
                <button className={'no-focusborder'} type="submit" style={{borderRadius: "25px"}} >Search By Date </button>
              </form>
            </div>
          <div style={{ minHeight: "80vh", display:"flex" , flexDirection: "column", textAlign:"center" }}>
            {this.props.schedule !== null
              ? this.props.schedule.map((schedule) => (
                  <ScheduleList key={schedule._id} schedule={schedule} />
                ))
              : <div className={style.loader}>Loading...</div>}
          </div>
          <div style={{ marginBottom: "20px", marginTop: "20px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "center" }}>
          {this.props.product!==null?<button className={'no-focusborder'} value={parseInt(this.props.page)-1>0?parseInt(this.props.page)-1:1} onClick={this.pagination} >Prev</button>:null}
          {this.props.product !== null?(() => {
            const options = [];
            if(Math.ceil(this.props.count/3)<=10){
              for (let i=1; i <= Math.ceil(this.props.count/3); i++) {
                options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                  {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                  {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
              }
            }
            else if(Math.ceil(this.props.count/3)>10 && parseInt(this.props.page)+9<= Math.ceil(this.props.count/3)){
              console.log('hello form here')
              for (let i=parseInt(this.props.page); i <= parseInt(this.props.page)+9; i++) {
                options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                  {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                  {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
                }
              }
              else if(Math.ceil(this.props.count/3)>10 && parseInt(this.props.page)+9> Math.ceil(this.props.count/3)){
                console.log('hello form here as well')
                for (let i=Math.ceil(this.props.count/3)-9; i <= Math.ceil(this.props.count/3); i++) {
                options.push(<button className={"no-focusborder"} style={ parseInt(this.props.page) === i ?
                  {textDecoration: 'underline', fontSize: '1.1rem', width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"} :
                  {textDecoration: "none", width: "40px", background: "#0dd3ff", borderRadius: "25px", color: "white", margin: "2px"}} onClick={this.pagination} key={i} value={i}>{i}</button>);
                }
              }
            return options;
            })(): null}
          {this.props.product!==null?<button className={'no-focusborder'} value={parseInt(this.props.page)+1<Math.ceil(this.props.count/3)?parseInt(this.props.page)+1:Math.ceil(this.props.count/3)} onClick={this.pagination} >Next</button>:null}
          </div>
          </div>
        );
    }
}


const mapStateProp = stateStore => {
    return {
        schedule : stateStore.scheduleState.schedules,
        count: stateStore.scheduleState.count,
        page: stateStore.scheduleState.page
    }
}

export default  connect(mapStateProp , {fetchSchdule, fetchSearchSchdule})(ScheduleReducer)
