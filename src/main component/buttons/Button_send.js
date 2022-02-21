import React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { makeStyles } from '@mui/styles';



const useStyles = makeStyles({
  root: {
    background: "#0000FF rgb(0, 0, 255)",
    border: 0,
    borderRadius: 7,
    padding :12 ,
    color: 'white',
    height: 48,

  },
});
 const ButtonSend = () => {
  const classes = useStyles();
  return (<div>
<Button className={classes.root} variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
  </div>)
};

export default ButtonSend
