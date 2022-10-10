import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';
import {Link} from "react-router-dom"

const Date = styled.div`
margin-top : 20px;

width : 100%;
background-color : white;
height : 100px;
margin : 0;
padding : 10px;


Stack {
    display : flex;
}
.date-pick{
    display : flex;
    width : 70%;
    margin : auto;
    gap : 20px;
    margin-top : 30px;
}
`
const Button = styled.button`
background-color : #2A6EC1;
height : 52px;
width : 130px ;
border : none;
border-radius : 5px;
color : white;
cursor: pointer;
font-size : 18px;
`
export default function NativePickers() {

    const item = JSON.parse(localStorage.getItem("inputsData"))
   
  return (
    <div>

   <Date>
    <div className='date-pick'>

  
   <Stack component="form" noValidate spacing={3} >
   
      <TextField
        id="date"
        label="City"
        
        type="text" 
        defaultValue={"📍"}
        value={item.goingToVal}
        sx={{ width: 350 }}
        InputLabelProps={{
          shrink: true,
        }}
       
      />

    </Stack>
   
    <Stack component="form" noValidate spacing={3} >
    {/* <div style="border: 1px solid #DDD;">
    <img src="location.png"/> */}
    {/* <input style="border: none;"/> */}

      <TextField
        id="date"
        label="Date"
        type="text"
        defaultValue={item.startDate}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        
      />
{/* </div> */}
    </Stack>
    <Stack component="form" noValidate spacing={3} >
      <TextField
        id="date"
        label="Date"
        type="text"
        defaultValue={item.endDate
        }
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        
      />

    </Stack>
    <Link to="/"><Button>Search</Button></Link>
    </div>
    </Date>
    </div>
  );
}