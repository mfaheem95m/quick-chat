import React from 'react'
import "./signup.css"
import { Link } from "react-router-dom";

import { useContext } from 'react';
import { useNavigate } from 'react-router'
import {authentification,fireStore}from "../firebase"
import { signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import {  addDoc, collection } from "firebase/firestore"
import myContext from './Context';
import { useState,useEffect} from "react";

 const SignUp = () => {
  const cont = useContext(myContext)
  const {setIsUser,gettingUsers} = cont
let navigate = useNavigate();
  const [userData,setUserData]=useState({
    name : "",
    email:"",
    password: "",
    confirmPassword :"",
  })
  useEffect(() => {

    gettingUsers(fireStore)




  },[])


  let name,value;
  const userDataStore = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({...userData,[name] : value})
  }


  async function gettingPosts (db) {

    const {name , email, password }= userData


    const result =   await addDoc(collection(db, "users"), {
        name : name,
        email:email,
        password:password,
        isOnline:false,
        isGoogle:false,

      });
      gettingUsers(fireStore)
      return result


   }



const signInWithGoogle = async () =>{
  const {users} = cont
  const user = users.snapshot


  const provider = new GoogleAuthProvider()
const data =await  signInWithPopup(authentification,provider)
const name =data.user.displayName
  const email=data.user.email
  const photo =data.user.photoURL
 const isUser = user.some(item =>(
      item.name === name && item.email === email
      )
     )

  if(name && email && photo ){
    if(!isUser){

       await addDoc(collection(fireStore, "users"), {
      name : name,
      email:email,
      photo:photo,
      isOnline:false,
      isGoogle:true,
    })
    setIsUser(true)
    gettingUsers(fireStore)
    navigate('/main')
     }
 }

}

  const onClicking = () => {
    const {name , email, password ,confirmPassword  }= userData

    if(name && email && password && confirmPassword ){
      if(password === confirmPassword ){

     gettingPosts(fireStore)
     alert("your account is registered")
     setIsUser(true)
     setUserData({
      name : "",
      email:"",
      password: "",
      confirmPassword :"",
     })

      }else{
        alert("please enter the correct data")

      }

    }else {
      alert("please fill up the data")


    }
  }



  return (
    <>
    <div>
     <div className='container-first-half'>
      <div className="flex-container">
       <div className='item-one' >
         <h1>Welcome !</h1>
       </div>
         <div className='item-two'>
         <h3>Already have an account?</h3>
         </div>
          <div className='item-three'>
            <Link to = "/">
            <button>Login</button>
            </Link>
          </div>
            </div>

      </div>
      <div className='container-second-half'>
      <div className="flex-container-two">
        <div className='con-item-one' >
          <h1>Signup</h1>
            </div>
            <div className='con-item-three'>
            <input
                          type="text"
                          name="name"

                          className="form-control"
                          placeholder="user Name"
                          value={userData.name}
                          onChange={userDataStore}
                        />
                </div>
                <div className='con-item-three'>
                <input
                          type="email"
                          name="email"

                          className="form-control"
                          placeholder="Email"
                          value={userData.email}
                          onChange={userDataStore}
                        />

                  </div>
                  <div className='con-item-three'>
                <input
                          type="password"
                          name="password"

                          className="form-control"
                          placeholder='Password'

                          value={userData.password}
                          onChange={userDataStore}
                        />

                  </div>
                  <div className='con-item-three'>
                <input
                          type="password"
                          name="confirmPassword"

                          className="form-control"
                          placeholder='Confirm Password'

                          value={userData.confirmPassword}
                          onChange={userDataStore}
                        />

                  </div>
                  <div className='con-item-four'>
                    <button onClick={onClicking}>Signup</button>

                      </div>
                      <div className='con-item-five'>
                    <button onClick={signInWithGoogle}>Signup with google</button>

                      </div>



                    </div>
      </div>
    </div>
    </>
  )
}
export default SignUp
