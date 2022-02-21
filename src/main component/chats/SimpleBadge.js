import React from 'react';
import { Avatar } from '@mui/material';

 const Simple = ({pic}) => {

  return (

        <div className='chatting-one'>
        <Avatar

  alt="Remy Sharp"
  src = {pic}

  sx={{ width: 46, height: 46 }}
 />
        </div>

  )
};

export default Simple
