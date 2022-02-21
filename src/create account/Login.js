import React from 'react'
import "./login.css"
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import myContext from './Context';
import { useNavigate  } from 'react-router'
import {authentification,fireStore}from "../firebase"
import { signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
 const Login = () => {
  const cont = useContext(myContext)
  let navigate = useNavigate();

  const {users,isLoged, setLoginInfo} = cont

  const [logUser,setLogUser] = useState({
    name:"",
    password: "",
  })

  let name,value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setLogUser({...logUser,[name] : value})
  }


  const signInWithGoogle = async () =>{
    try{
       const provider = new GoogleAuthProvider()
  const data =await  signInWithPopup(authentification,provider)
  const nameS =data.user.displayName
    const emailS=data.user.email
    const isUser = users.some(item =>(
      item.name === nameS && item.email  === emailS
      )
     )
     const found = users.find(item  =>
      item.name === nameS && item.email  === emailS
       );
console.log("isuser",found)
      if(isUser) {
        setLoginInfo(found)
        updateData(found.id)
        isLoged(true);
        navigate('/main')

      }
    }
   catch (err){
     console.log("error",err)
   }

  }
 async function updateData(id){
  const washingtonRef = doc(fireStore, "users", id);

   await updateDoc(washingtonRef, {
    isOnline: true
  });
 }


  const onLogin = () => {

    const {name,password} =logUser
    const user = users
    const isUser = user.some(item =>(
      item.name === name && item.password === password
      )
     )

const found = user.find(item  =>  item.name === name && item.password === password);
console.log("imp",found)



     if(isUser){
       alert("yess you are loged in your account")
       isLoged(isUser);
       navigate('/main')
       setLoginInfo(found)
       updateData(found.id)
       console.log("idf",found.id)

     }else{
       alert("please enter the correct userName and password")
       setLogUser({
        name:"",
        password: "",
       })
       console.log("12",users.snapshot)
     }

  }
  console.log("isuser2",users)
  return (
    <div>
     <div className='container-first-half-login'>
      <div className="flex-container">
       <div className='item-one' >
         <h1>Welcome !</h1>
       </div>
         <div className='item-two'>
         <h3>Don't have an account?</h3>
         </div>
          <div className='item-three'>
          <Link to = "/signup">
            <button>SignUp</button>
            </Link>
          </div>
            </div>

      </div>
      <div className='container-second-half-login'>
      <div className="flex-container-two">
        <div className='con-item-one' >
          <h1>Login</h1>
            </div>
            <div className='con-item-three'>
            <input
                          type="text"
                          name="name"

                          className="form-control"
                          placeholder="user Name"
                          value={logUser.name || ''}
                          onChange={handleChange}
                        />
                </div>

                  <div className='con-item-three'>
                  <input
                          type="password"
                          name="password"

                          className="form-control"
                          placeholder="password"
                          value={logUser.password}
                          onChange={handleChange}
                        />

                  </div>

                  <div className='con-item-four'>
                    <button onClick={onLogin}>Login</button>
                      </div>
                      <div className='con-item-five'>
                    <button onClick={signInWithGoogle}>Login with google</button>

                      </div>



                    </div>
      </div>
    </div>
  )
}

export default Login
