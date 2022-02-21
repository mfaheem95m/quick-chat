import React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import "./main.css"
import { useContext,useState } from "react";
import { AiFillSetting } from 'react-icons/ai';
import { Avatar } from '@mui/material';
import "./Profile.css"
import { useNavigate } from 'react-router'
import myContext from "../create account/Context"
import {fireStore}from "../firebase"
import { doc, updateDoc } from "firebase/firestore";
const Profile = () => {
  const cont = useContext(myContext)
  const {loginInfo,setIsUser} = cont
  let navigate = useNavigate();
const [checked,setChecked] = useState(true)
  async function updateData(id){
    const washingtonRef = doc(fireStore, "users", id);

    // Set the "capital" field of the city 'DC'
     await updateDoc(washingtonRef, {
      isOnline: false
    });
   }
   async function updateTrue(id){
    const washingtonRef = doc(fireStore, "users", id);

    // Set the "capital" field of the city 'DC'
     await updateDoc(washingtonRef, {
      isOnline:true
    });
   }
   const handleLoginTo = ( ()=> {

    if(checked){
      setChecked(false)
      updateData(loginInfo.id)
    }else{
      setChecked(true)
      updateTrue(loginInfo.id)

    }

   })
  const handleLog = ( ()=> {
    navigate("/")
    updateData(loginInfo.id)
    setIsUser(false)
   })
   console.log("checked",checked)
   console.log("check",loginInfo.isOnline)
  return(

<div className='profile-main'>
  <div className='pic-main'>
<Avatar

  alt="Remy Sharp"
  // src="https://thumbs.dreamstime.com/b/baby-boy-posing-2607278.jpg"
  src = {loginInfo.isGoogle ? loginInfo.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-CujXEB_pHNjg6VnEKrUJW-sgY-6glbQhw&usqp=CAU" }
  sx={{ width: 76, height: 76 }}
 />
  </div>
  <div className='name-user'>
    <h5><span className = "speci">{loginInfo.name}</span><AiFillSetting/></h5>
    </div>
  <div className='des-user'>
<h5 > Lead UX/UI Designer </h5>
  </div>
  <div className='status-user'>

<FormGroup>
      <FormControlLabel control={<Switch defaultChecked = {true}  size="small"
      // checked = {checked}
      onChange={handleLoginTo}
      />} label="Active" />

    </FormGroup>

  </div >
  <div className = 'btn-log'>
     <button className='logout-btn' onClick={handleLog}>Logout</button>
  </div>


</div>




  );
};

export default Profile
