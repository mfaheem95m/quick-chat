import React from 'react';
// import BadgeAvatars from "./buttons/Online_avator"
import myContext from "../create account/Context"
import { useContext} from "react";
// import { doc, getDoc } from "firebase/firestore"
import {useEffect} from "react";
import {fireStore}from "../firebase"
import Avatour from "./Avatour"

import { doc, getDoc} from "firebase/firestore";
const Message = ({isMessage}) => {
  const cont = useContext(myContext)

  const {messageCollection,loginInfo,recieverId,messageid,SetMessageCollection,recieverImg,recieverGoogle} = cont
  let src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-CujXEB_pHNjg6VnEKrUJW-sgY-6glbQhw&usqp=CAU"

 const user =  messageCollection.filter(item => (item.recieveId === recieverId && item.senderId === loginInfo.id) ||(item.recieveId === loginInfo.id && item.senderId === recieverId) )

async function getMessages(db) {

const docRef = doc(db, "messages", messageid);
const docSnap = await getDoc(docRef);
return docSnap
}
 async function gettingMessages (db) {

  try{
   const snapshot = await getMessages(db);

const snapshotData =snapshot.data()
const messCollection = snapshotData.message
 SetMessageCollection(messCollection);

  } catch (err){
     console.log("error")
  }
 }
//  }

  useEffect(() => {

    // gettingUsers(fireStore)
     gettingMessages(fireStore)



   },[isMessage])


  return (
<>

{ user.map((item,index) => (
  item.senderId === loginInfo.id ?
  <div id = "send" className='messagesQW' key = {index}>
<div id = "senderImg" className='sender' >

     <Avatour pic = {loginInfo.isGoogle ? loginInfo.photo : src }/>
     {/* {loginInfo.isOnline ?
     <BadgeAvatars pic = {loginInfo.isGoogle ? loginInfo.photo : src }/>
       :
       <Avatour pic = {loginInfo.isGoogle ? loginInfo.photo : src }/>
      } */}
      </div>
      <div className='reciever' >
        <p className='send'>{item.message}</p>
      </div>
       </div>  :
         <div className='messages' key = {index} >
         <div id = "senderIm"  className='sender'>

     <Avatour pic = {recieverGoogle ? recieverImg: src }/>
     {/* {recieverOnline ?
     <BadgeAvatars pic = {loginInfo.isGoogle ? loginInfo.photo : src }/>
       :

     <Avatour pic = {loginInfo.isGoogle ? loginInfo.photo : src }/>

      } */}
               </div>
               <div className='reciever' >
                 <p className='send' >{item.message}</p>
               </div>
                </div>


 ))
}
</>

  )
}

export default Message
