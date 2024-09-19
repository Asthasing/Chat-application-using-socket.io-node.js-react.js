
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.css';

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket;

// import './chat.css';

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message , setMessage] = useState(' ');
  const [messages , setMessages] = useState([]);
  const location = useLocation();
  const ENDPOINT = 'http://localhost:5000'; // Ensure this points to your server

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // Connect to the Socket.IO server
    socket = io(ENDPOINT, {
      transports: ['websocket'], // Ensure websocket transport is used
    });

    setName(name);
    setRoom(room);

    // Emit the 'join' event when connected
    socket.emit('join', { name, room }, () => {
      // if (error) {
      //   alert(error);
      // }
    });

    // Cleanup: disconnect the socket when leaving the component
    //  return () => {
    //    socket.disconnect();
    //   socket.off();
    //  };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message' , (message) => {
      setMessages([...messages , message]);

    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  } , [messages]);

  //functions for sending messages.
  const sendMessage = (event) => {
    event.preventDefault();

    if(message){
      socket.emit('sendMessage' , message , () => setMessage(' '));
    }
  }

  console.log(message , messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar  room={room}/>
        <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

      {/* <input value={message} onChange={(event) => setMessage(event.target.value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} /> */}
      </div>
      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;














// import React , {useEffect , useState} from 'react';
// import { useLocation } from 'react-router-dom';
// import queryString from 'query-string';
// import io from 'socket.io-client';

// const Chat = ({location}) => {
//   //const location = useLocation(); 
//   useEffect(() =>{
//     const {name , room} = queryString.parse(location.search);

//     console.log(name , room);
//     //console.log(data);
//   },[location.search]);
//   return (
//     <h1>Chat</h1>
//   )
// }

// export default Chat;
