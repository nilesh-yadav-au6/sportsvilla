import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message, sendCurrentBid, timing }) =>{ 
return (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <button className="sendButton no-focusborder" onClick={e => sendMessage(e)}>Send</button>
    {timing <=180 && timing>0?<button className="sendButton no-focusborder"  onClick={e=> sendCurrentBid(e)} > Bid </button>: <button className="sendButton no-focusborder" disabled >BID </button>}
  </form>
)}

export default Input;