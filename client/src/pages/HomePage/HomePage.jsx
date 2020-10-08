import React, { Component } from "react";
import { connect } from "react-redux";
import { getHOFALL, getCurrentMatch } from "../../redux/actions/hofAuction";
import { Carousel } from "react-bootstrap";
import sachin from "../../images/ST.jpg";
import style from "./HomePage.module.css";
import { Link } from "react-router-dom"
import HofPlayerList from "../../components/HofList/HofPlayersList"
import 'css-doodle';

class Example extends Component {

    componentDidMount() {
        this.props.getHOFALL(1, 3);
        this.props.getCurrentMatch()
    }

    render() {
        return (
        <div>
            {this.props.todayMatch.length!==0?
            <>
            <Carousel className={style.background} >
            {this.props.todayMatch.map( match =>
                <Carousel.Item key={match._id}>
                    <img
                    className={style.imageCrausal}
                    src={match.team1ImageUrl}
                    alt="First slide"
                    />
                    <img
                    className={style.imageCrausal}
                    src={match.team2ImageUrl}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3 style={{color: "black"}} >{match.team1} vs {match.team2}</h3>
                    <Link to={`/shceduledetaill/${match._id}`} > <button className={"no-focusborder"} style={{background: "#1cc7d0", borderRadius: "25px"}} > Buy Ticket </button> </Link>
                    </Carousel.Caption>
                </Carousel.Item>
            )}
            </Carousel>
            </>
            :
            <Carousel>
                <Carousel.Item>
                    <img
                    className={` w-100  ${style.carImage}`}
                    src={sachin}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>God of Cricket</h3>
                    <p>The Sachin Ramesh Tendulkar</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className={` w-100  ${style.carImage}`}
                    src={sachin}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>God of Cricket</h3>
                    <p>The Sachin Ramesh Tendulkar</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            }
            <div className="hallOfFame">
            <div style={{width: "100%", textAlign: "center" }}>
                <h1 style={{ fontFamily: "'Lobster', cursive" }}>Holl Of Fame</h1>
            </div>
            <Link style={{ color: 'white' }} className={style.myLink} to="/hofplayers">
                <p style={{ margin: "2rem 10rem", color: "#330066" }}>See All</p>
            </Link>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }} className={style.carousel}>
                {this.props.hofPlayer !== null ? (
                this.props.hofPlayer.map((player) => (
                    <Link style={{ color: 'white' }} className={style.myLink} key={player._id} to={`/hofplayes/detaill/${player._id}`}>
                        <HofPlayerList key={player._id} hofPlayer={player} />
                    </Link>
                ))
                ) : null}
            </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (storeState) => {
    return {
        user: storeState.loginState.user,
        hofPlayer: storeState.hofPlayerState.hofPlayers,
        todayMatch: storeState.hofPlayerState.currentMatch
    };
};

export default connect(mapStateToProps, { getHOFALL, getCurrentMatch })(Example);
