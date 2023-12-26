import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  { jwtDecode }  from "jwt-decode";
import { useNavigate } from "react-router-dom";



const Dashboard = () => {
  const [name, setName ] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async() => {
    try {
      const response = await axios.get('https://project-05-three.vercel.app/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);

    } catch (error) {
        if(error.response){
          navigate("/");
          console.log('errornya disini')
        }
    }
  }

const axiosJWT = axios.create();


axiosJWT.interceptors.request.use(async(config) => {
  const currentDate = new Date();
  if(expire * 1000 < currentDate.getTime()){
    const response = await axios.get('https://project-05-three.vercel.app/token');
    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    setToken(response.data.accessToken);
    const decoded = jwtDecode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);

  }

  return config;
}, (error) =>{
  return Promise.reject(error);

});


  const getUsers = async() => {
    const response = await axiosJWT.get('https://project-05-three.vercel.app/users', {
      headers: {
        Authorization: ` Bearer ${token} `
      }       
    });
    setUsers(response.data);
  }

  return (
    <div className=' container mt-5'>
        <h1 className="tittle">
            Welcome Back : {name} 
            <button onClick={getUsers} className='button is-info'> GET User </button>
            <table className='table is-striped is-fullwidth'>
              <thead>
                <tr>
                  <th> No. </th>
                  <th> Name </th>
                  <th> Email</th>
                </tr>
              </thead>
              <tbody>
                { users.map((user, index) => (
                <tr key =  {user.id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.email}</td>
                </tr>

                ))}

              </tbody>
            </table>
        </h1>
    </div>
  )
}

export default Dashboard