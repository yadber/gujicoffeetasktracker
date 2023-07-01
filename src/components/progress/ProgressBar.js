import React from 'react'
import  Box  from '@mui/material/Box'
import  LinearProgress  from '@mui/material/LinearProgress'



export default function ProgressBar({fileNumber,fileNumberMessage, color,onclickProgress}) {
  return (
    <div className="cursor-pointer" onClick={()=>onclickProgress(fileNumber)}>

    <Box sx={{width:"100%"}} >
        {fileNumberMessage} 
        <LinearProgress color={color}/>
    </Box>
    </div>
  )
}
