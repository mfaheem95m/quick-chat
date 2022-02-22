import React from "react"
import Main from "./main component/Main"
import { getDocs,collection } from "firebase/firestore"
import SignUp from "./create account/SignUp"
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Login from "./create account/Login"
import {Provider} from "./create account/Context"
import { useState,useEffect } from "react";
import {fireStore}from "./firebase"
import { query, where } from "firebase/firestore";
import { doc, getDoc} from "firebase/firestore";
import { Navigate } from "react-router-dom";
 const App = () => {

  const [users,setUser] = useState([])
  const[log,isLoged]=useState(false)
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

useEffect(() => {

  gettingUsers(fireStore)
  getMess()



},[])


  const  onClickedFriend = ((item) => {
    setClickedItem(item)
    setRecieverId(item.id)
    setRecieverImg(item.photo)
    setRecieverGoogle(item.isGoogle)
    setRecieverOnline(item.isOnline)
      })
//   const isLoged = ((islogin) => {
// setIsLogin(islogin)
//   })
  async function getUser(db) {
    const querySnapshot = await getDocs(collection(db, "users"));
    console.log("date",querySnapshot.docs)
    const postsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}


      ));
    return postsList;

}
async function gettingUsers (db) {

  try{
   const snapshot = await getUser(db);
  console.log("array",snapshot)


 setUser(snapshot);

  } catch (err){
     console.log("error",err)
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
 SetMessageCollection(messCollection);

    } catch (err){
       console.log("error",err)
    }
   }



  //  async function getUse() {
  //   const {email,password} =logUser
  //   const emails =logUser.email
  //   const passwords =logUser.password
  //   if(emails && passwords){

  //   }
  //   const citiesRef = collection(fireStore,  "users");
  //   const q =  await query(citiesRef, where("email", "==", emails), where("password", "==", passwords));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {

  //     setLoginInfo({ id: doc.id, ...doc.data() })
  //     setUsing(true)
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //   });






   async function getMess() {

    // const docRef = doc(fireStore, "messages", messageid);
  // const docRef = doc(fireStore, "messages", messageid);
  // const docSnack= await getDoc(docRef);
 const docRef = collection(fireStore, "messages");

    const q = await query( docRef , where("message", "array-contains", { senderId: "dcba", recieveId: "abcd"}));

    const docSnap = await getDoc(q);
console.log("docSnap,",q)
    return docSnap

    }

   const contextState = {
  isLoged,

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


console.log("fqwe",users)
console.log("lah", typeof clickedItem.id)
console.log("lahore",clickedItem)
console.log("messageCollection",messageCollection)

  return (
    <div>
       <Provider  value={contextState}>

<BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp/>} />
      { log ?
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
