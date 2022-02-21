import React from 'react';
import myContext from "../../create account/Context"
import { useContext} from "react";
import Simple from "./SimpleBadge"
import OnlineBadge from "./OnlineBadge"
 const Active = ({name,pic,item}) => {
  const cont = useContext(myContext)

  const { onClickedFriend,setShow} = cont

 const clicked = ((item) => {
  onClickedFriend(item)
  setShow(true)
 })
  return (
    <div id = "faheem" onClick = {() => clicked(item)}>
    <div className='chatting'>

        {item.isOnline ?
     <OnlineBadge pic = {pic}/> :
      <Simple  pic = {pic}/>}
        <div className='chatting-two'>
          <p className='chatting-two-name'>{name}</p>
        </div>
        </div>
        </div>
  )
};

export default Active
