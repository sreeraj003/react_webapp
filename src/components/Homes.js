import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './home.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setHomeData } from '../redux/home'
function Homes() {
	const dispatch = useDispatch()
    const history = useNavigate()
    useEffect(()=>{
        async function dataCall(){
            const token = localStorage.getItem('token')
            const user = localStorage.getItem('userId')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get(`http://localhost:8000/homeData/${user}`)
        .then(res=>{
            if(res.data!=='unauthorized'){
                dispatch(setHomeData(res.data))
            } else{
                history('/')
            }   
            }
        )
        }
       dataCall()
    },[])
    const logdata = useSelector(state=>state.home)
    useSelector(state=>console.log(state));
    // const logdata = useSelector(state=>console.log(state))
    console.log(logdata);
  return (
    <div className='homepage'>
	<div className="navbar">
		<Link to="/home" className="active">Home</Link>
		<Link style={{position:'absolute',marginLeft:'100px'}} to="/userProfile" className="profile">Profile</Link>
		<Link to="/" className="logout">Logout</Link>
	</div>
	
	<div style={{marginTop:100}}>
		<h1>Hi {logdata.data.name} Welcome to my website!</h1>
		<p>This is a basic home page with a navigation bar that includes a "Logout" button and a "Profile" button.</p>
	</div>
	</div>
  )
}

export default Homes