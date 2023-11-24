import React,{useState,useEffect} from "react";
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
//import Box from '@mui/material/Box';
const  LoadingCard= ({count})=>{
    const arr=new Array(count).fill(count)
return(<>
    {arr.map((e,i)=><Card className="col-md-4 mb-3" key ={i} sx={{ maxWidth: 345 }}>
        <Skeleton className="mb-2 p-2" variant="rectangular" width={340} height={118} />
        <Skeleton variant="rectangular"  className="mb-2 p-2" width={340} height={118} />
              <Skeleton width="100%"  className="mb-2 p-2" height={50} />    
    </Card>)}
</>)
}
export default LoadingCard;