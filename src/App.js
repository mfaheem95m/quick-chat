import React from "react"
import Main from "./main component/Main"
import { getDocs,collection } from "firebase/firestore"
import SignUp from "./create account/SignUp"
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Login from "./create account/Login"
import {Provider} from "./create account/Context"
import { useState } from "react";
import {fireStore}from "./firebase"
import { doc, getDoc} from "firebase/firestore";
import { Navigate } from "react-router-dom";
 const App = () => {

  const [users,setUser] = useState([])
  const[isLogin,setIsLogin]=useState(false)
const[ loginInfo,setLoginInfo] = useState([])
const[clickedItem,setClickedItem] = useState([])
const[messageCollection,SetMessageCollection]=useState([])
const[messageid]= useState('lGVVYbcTNWivrZeDcW8H')
const [recieverId,setRecieverId]= useState('')
const [recieverImg,setRecieverImg]= useState('')
const [recieverGoogle,setRecieverGoogle]= useState(false)
const [recieverOnline,setRecieverOnline]= useState(false)
const [show,setShow] = useState(false)
const [isUser,setIsUser] = useState(false)


  const  onClickedFriend = ((item) => {
    setClickedItem(item)
    setRecieverId(item.id)
    setRecieverImg(item.photo)
    setRecieverGoogle(item.isGoogle)
    setRecieverOnline(item.isOnline)
      })
  const isLoged = ((islogin) => {
setIsLogin({islogin})
  })
  async function getUser(db) {
    const querySnapshot = await getDocs(collection(db, "users"));

    const postsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return postsList;

}
async function gettingUsers (db) {

  try{
   const snapshot = await getUser(db);
  console.log("array",snapshot)


 setUser(snapshot);

  } catch (err){
     console.log("error")
  }

 }

 async function getMessages(db) {

  const docRef = doc(db, "messages", messageid);
  const docSnap = await getDoc(docRef);
  return docSnap
  }
   async function gettingMessages() {

    try{
     const snapshot = await getMessages(fireStore);

  const snapshotData =snapshot.data()
  const messCollection = snapshotData.message
 console.log("messagess",SetMessageCollection(messCollection));

    } catch (err){
       console.log("error",err)
    }
   }


   const contextState = {
  isLoged,
  isLogin,
  users,
  loginInfo,
  setLoginInfo,
  onClickedFriend,
  messageid,
  recieverId,
  setShow,
  show,
  messageCollection,
  setUser,
  SetMessageCollection,
  setIsUser,
  recieverImg,recieverGoogle,
  recieverOnline,
  gettingMessages,
  gettingUsers,isUser

}


console.log("fqwe")
console.log("lah", typeof clickedItem.id)
console.log("lahore",users)
console.log("messageCollection",messageCollection)

  return (
    <div>
       <Provider  value={contextState}>

<BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
      { isLogin ?
   <Route path="/main" element={<Main />} />
    :
    <Route path="*" element={<Navigate to ="/" />}/>

     }

    </Routes>
  </BrowserRouter>
       </Provider>

    </div>

  )
}

export default App
