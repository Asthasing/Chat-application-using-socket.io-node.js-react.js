import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join = () => {
  //In React , hooks are special functions that allow you to use state and other react features in functional components.There are several built-in hooks , such as useState,
  //,useEffect , useContext and more.
  const [name , setName] = useState('');
  const [room , setRoom] = useState(' ');
  return (
   <div className='joinOuterContainer'>
   <div className='joinInnerContainer'>
    <h1 className='heading'>Join</h1>
   <div><input placeholder='Name' className='joinInput' type='text' onChange={ (event) => setName(event.target.value)} /></div>
   <div><input placeholder='Room' className='joinInput mt-20' type='text' onChange={(event) => setRoom(event.target.value)} /></div>
   <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
   <button className='button mt-20' type='submit'>Sign In</button>
   </Link>
   </div>
   </div>
  )
}

export default Join;
