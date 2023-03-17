import React,{useState} from "react";
import { Button } from "reactstrap";

const User_Dashboard = () => {
  var t
  const [count,addcount]=useState(1);
 const tt =()=>{
  addcount(count+1)
  console.log(count)
 }
  return <>
  <Button onClick={tt}>

ttt

  </Button>
  <h1>{count}</h1>
  </>;
};

export default User_Dashboard;
