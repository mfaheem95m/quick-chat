import React from 'react';
import Profile from './Profile';
import Friends from './ChatRoom';
import "./main.css"
import Chats from "./chats/FriendsList"
import LoginHoc from "../create account/LoginHoc"
import Icon from './buttons/Icon';
const Main = () => {

  return (
<div className ="container">
<div className="grid-container">
  <div className= "grid-item-one">

 <Icon/>
 <div className='profile'>
<Profile/>


 </div>
<div>
  <h5 className = "text">Active conversations</h5>
 <Chats/>

</div>
  </div>
  <div className="grid-item-two">

<Friends/>



  </div>

 </div>
</div>
  )
};

export default LoginHoc(Main)
