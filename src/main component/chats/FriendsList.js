import React from 'react';
import "./chats.css"
import myContext from "../../create account/Context"
import { useContext } from "react";
import Active from './Active';

 const Chats = () => {
  const cont = useContext(myContext)
  const {loginInfo,users} = cont
  let user = users.filter(item => item.id !== loginInfo.id)
  let src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-CujXEB_pHNjg6VnEKrUJW-sgY-6glbQhw&usqp=CAU"
  return (
    <div className='heading'>
      <div className='heading-one'>
      {user.map(item => (

      <Active  key = {item.id} pic = {item.isGoogle ? item.photo : src } name = {item.name} item = {item}/>
       )) }


      </div>


    </div>
  )
};
export default Chats
