import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './CreateRoom.css';
import AuctionPlayer from '../../components/AuctionPlayers/AuctionPlayers'
import style from '../Products/Products.module.css'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap'
import { playerAuction, playerFalseAuction } from '../../redux/actions/addAuction'
import { NotificationManager } from 'react-notifications';
import { fetchPlayers } from '../../redux/actions/playerActions'

let socket;

const Chat = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [players, setplayers] = useState([]);
    const [currentPlayer, setcurrentPlayer] = useState({});
    const [tier, setTier] = useState()
    const ENDPOINT = 'https://sports-vella.herokuapp.com';

    useEffect(() => {
        const room = props.user.data.commenUser.auction
        const name = props.user.data.commenUser.name || props.user.data.commenUser.teamName

        socket = io(ENDPOINT,{reconnection: true});
        console.log(ENDPOINT,1234)
        setRoom(room);
        setName(name);
        socket.on('connect', ()=>{
            console.log(socket.id,1234)
        })
        socket.on('disconnect', ()=>{
            console.log('here')
        })
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                NotificationManager.error(error, 'Error')
            }
        });
        }, [ENDPOINT, props.user.data.commenUser.auction, props.user.data.commenUser.name, props.user.data.commenUser.teamName ]);

        useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });

        socket.on('players', player => {
            setplayers(player.players);
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
        }, []);

        useEffect(()=>{
            socket.on('currentplayers', ({players}) =>{
                console.log(players)
                setcurrentPlayer(players)
            })
        }, [currentPlayer])

        const sendMessage = (event) => {
            event.preventDefault();
            if(message) {
                socket.emit('sendMessage', message, () => setMessage(''));
            }
        }

        useEffect(()=>{
            socket.on('displayTimer', ({tier}) =>{
                setTier(tier)
            })
        }, [tier])

        useEffect(()=>{
            socket.on('trialError', ({message}) =>{
                socket.disconnect()
                props.history.push('/dashboard')
            })
        })
        
        const handelAddAuction = (id) => {
            props.playerAuction(id)
            setTier(181)
            setTimeout(()=>{
                socket.emit('newAuctionState', {}, () => console.log('hello'))
            }, 3000)
        }

        const handelSPLAuction = e => {
            e.preventDefault()
            if(currentPlayer.soldTeamName === undefined){
                NotificationManager.info(`${currentPlayer.name} is unsold till now `, 'Unsold');
            }else if(currentPlayer.soldTeamName !== undefined){
                NotificationManager.success(`${currentPlayer.name} sold to ${currentPlayer.soldTeamName}`, 'Congratulations')
            }
            props.fetchPlayers()
            props.playerFalseAuction(currentPlayer._id)
            setTier(181)
            socket.emit('Timer', {timer:-1}, () => console.log('fire'))
            socket.emit('AuctionState', {}, () => console.log('hello'))
        }

        const handelAuction = e => {
            if(e){
                e.preventDefault()
            }
            if(currentPlayer.soldTeamName === undefined){
                NotificationManager.info(`${currentPlayer.name} is unsold till now `, 'Unsold');
            }else if(currentPlayer.soldTeamName !== undefined){
                NotificationManager.success(`${currentPlayer.name} sold to ${currentPlayer.soldTeamName}`, 'Congratulations')
            }
            props.fetchPlayers()
            props.playerFalseAuction(currentPlayer._id)
            setTier(181)
            socket.emit('Timer', {timer:-1}, () => console.log('fire'))
            socket.emit('AuctionState', {}, () => console.log('hello'))
        }
        
        const sendCurrentBib = e =>{
            e.preventDefault()
            console.log(currentPlayer, "I am CurrentPlayer")
            props.fetchPlayers()
            socket.emit('currentBid', { soldPrice: parseInt(currentPlayer.soldPrice)+500, teamId: props.user.data.commenUser._id, playerId:currentPlayer._id },()=>console.log('HelloFromHere'))
        }
        const handelTimer = e =>{
            e.preventDefault()
            socket.emit('Timer', {timer: 30}, () => console.log('fire') )
        }
        
        const handeLeave = e =>{
            if(props.user.data.commenUser.name){
                socket.disconnect()
            }else if(props.user.data.commenUser.teamName){
                socket.disconnect()
            }
        }

    return (
        <div className="ParentDiv">
            <TextContainer users={users} />
            {tier<=180 && tier>=0?<h1 style={{backgroundColor: '#1A1A1D', textAlign: "center"}} > Time remaining {tier} seconds for Bid </h1>:null}
            <div className="outerContainer">
            <div className="container">
                {currentPlayer===undefined ||currentPlayer===null?
                <h1 style={{textAlign: "center"}} >No Current Player</h1>: 
                <div>
                    <h4 style={{color: "white"}} >Current BID: {currentPlayer.soldPrice}, Base Price: {currentPlayer.basePrice}</h4>
                    <h4 style={{color: 'white'}} >Current Team: {currentPlayer.soldTeamName}</h4>
                    <div>
                        <Card.Img style={{height: '300px', width: '100%'}}  variant="top" src={currentPlayer.avatar} />
                    </div>
                    <div>
                    <Card.Body>
                        <Card.Title className={"detail"} >Name: {currentPlayer.name}</Card.Title>
                        <Card.Title className={"detail"} >Country: {currentPlayer.country}</Card.Title>
                        <Card.Title className={"detail"} >Speciality: {currentPlayer.speciality}</Card.Title>
                        <Card.Title className={"detail"} >Batting Style: {currentPlayer.battingStyle}</Card.Title>
                        <Card.Title className={"detail"} >Bowling Style: {currentPlayer.bowlingStyle}</Card.Title>
                        {tier===0? handelAuction() : null}
                        {props.user.data.commenUser.role==='Admin'?<button style={{background: "#40B4E5", borderRadius: "25px"}} className={"no-focusborder"} onClick={handelTimer} >Timer</button>:null}
                        {props.user.data.commenUser.role==='Admin'?<button style={{background: "#40B4E5", borderRadius: "25px"}} className={"no-focusborder"} onClick={handelSPLAuction} id={currentPlayer._id} >Remove</button>:null}
                    </Card.Body>
                    </div>
                </div> }
                </div>
            <div className="container">
                <InfoBar room={room} uzer={props.user.data.commenUser} leave={handeLeave} {...props} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} sendCurrentBid={sendCurrentBib} timing={tier} />
            </div>
            </div>
            {props.user.data.commenUser.role==='Admin'?<div className="playerList" >{players.length !== 0
                ? players.map((player) => (
                    <AuctionPlayer key={player._id} player={player} {...props} func={handelAddAuction} />
                ))
            : <div className={style.loader}>Loading...</div>}</div>: null}
        </div>
    )
}

const mapStateProp = (stateStore) => {
    return {
        players: stateStore.playerState.players,
        user: stateStore.loginState.user,
    };
};

export default connect(mapStateProp, {playerAuction, playerFalseAuction, fetchPlayers})(Chat);
