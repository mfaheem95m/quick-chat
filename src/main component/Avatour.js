import React from 'react';
import { Avatar } from '@mui/material';

 const Avatour = ({pic}) => {

  return (

      <>

        <Avatar

  alt="Remy Sharp"
  src = {pic}

  sx={{ width: 46, height: 46 }}
 />
      </>

  )

};

export default Avatour
