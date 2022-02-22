import React from 'react'
import "./login.css"
import { Link } from "react-router-dom";
import { useState,useContext,useEffect } from "react";
import myContext from './Context';
import { useNavigate  } from 'react-router'
import {authentification,fireStore}from "../firebase"
import { signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { doc, updateDoc ,collection,getDocs} from "firebase/firestore";
import { query, where } from "firebase/firestore";
 const Login = () => {
  const cont = useContext(myContext)
  let navigate = useNavigate();

  const {users,isLoged, setLoginInfo,loginInfo} = cont

  const [logUser,setLogUser] = useState({
    email :"",
    password: "",
  })
  const [using,setUsing] = useState(false)

  let name,value;
  // const emails =logUser.email
  // const passwords =logUser.password
  useEffect(() => {

    getUse()




  },[logUser.email,logUser.password])
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
        // setLoginInfo(found)
        updateData(found.id)

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


  const onLogin =async () => {

  if(loginInfo.email && loginInfo.password){
    isLoged(true)
  alert("yess you are loged in your account")
     navigate('/main')

  }else {
    alert("no user found")

    setLogUser({
          email:"",
          password: "",
         })
  }
//     const user = users
//     const isUser = user.some(item =>(
//       item.email === email && item.password === password
//       )
//      )

// const found = user.find(item  =>  item.email === email && item.password === password);
// console.log("imp",found)

    //  if(loginInfo.length === 1){
    //    alert("yess you are loged in your account")
    //    isLoged(true);
    //    navigate('/main')

    //    updateData(loginInfo.id)
    //    console.log("idf",loginInfo.id)

    //  }else{
    //    alert("please enter the correct userName and password")
    //    setLogUser({
    //     email:"",
    //     password: "",
    //    })
    //    console.log("12",users.snapshot)
    //  }

  }

  async function getUse() {
    const {email,password} =logUser
    const emails =logUser.email
    const passwords =logUser.password
    if(emails && passwords){

    }
    const citiesRef = collection(fireStore,  "users");
    const q =  await query(citiesRef, where("email", "==", emails), where("password", "==", passwords));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {

      setLoginInfo({ id: doc.id, ...doc.data() })
      setUsing(true)
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
console.log("name",emails)
console.log("pass",passwords)



}



console.log("never",loginInfo)

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
                          type="email"
                          name="email"

                          className="form-control"
                          placeholder="Email"
                          value={logUser.email || ''}
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
