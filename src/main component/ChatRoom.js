import React from 'react';
import {GrAttachment } from 'react-icons/gr';
import Message from "./Message"
import ButtonSend from "./buttons/Button_send"
import myContext from "../create account/Context"
import { useContext,useState } from "react";
import {fireStore}from "../firebase"
import { doc, updateDoc ,arrayUnion} from "firebase/firestore";
import {useEffect} from "react";
const Friends = () => {
  const cont = useContext(myContext)
  const {messageid,loginInfo,recieverId,show,gettingMessages} = cont
  const [text,setText] = useState("")

const [isMessage,setIsMessage] = useState(false)
// setIsMessage(false)

  useEffect(() => {

     gettingMessages(fireStore)

   },[])

const handleBlur = () => {
  setIsMessage(false)
}

  async function updateData(){
    const washingtonRef = doc(fireStore, "messages", messageid);
 const sender =loginInfo.id
//  var reciever =clickedItem.id
    // Set the "capital" field of the city 'DC'
    if(text){
 try {
  await updateDoc(washingtonRef, {
      message :arrayUnion({
      senderId : sender,
      recieveId:recieverId,
      message:text,
      date : new Date()
      })

       });
       setIsMessage(true)
      await gettingMessages()


    } catch(err) {
      console.log("errorrr",err)
    }

  setText("")
    }

   }




  return (
    <div className = "gridding">
<div className='grid-one'>

         { show ? <Message  isMessage = {isMessage}/>
         : ""
         }

</div>




      <div className='grid-two'>
        <div className='head1'>
          <div className='lower-one'><GrAttachment/></div>
          <div className='lower-two'>
            <input className='input' type = "text" placeholder='Enter your message here' name =  "message"
            value = {text} onChange={event => setText(event.target.value)}

            />
          </div>
          <div className='lower-three' onClick={updateData} onBlur={handleBlur} >
          <ButtonSend/>
          </div>

        </div>
      </div>

    </div>
  )
};
export default Friends
