import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()

const getData = async()=>{
  try {
    const response = await axios.post('api/user/get-user-info-by-id',{},{
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem("token")
      }
    })
    if(!response.data.success){
      navigate("/login")
    }
    console.log('response: ', response.data.success);

  } catch (error) {
    navigate("/login")
    console.log('error: ', error);
    
  }
}
  useEffect(() => {
    getData()
   
  }, []);

  return (
    <div>This is the dashboard</div>
  )
}

export default Dashboard