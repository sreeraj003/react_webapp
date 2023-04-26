import React from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import './login.css'
import { setEmail,setPassword } from "../redux/adminLogin";
import { useDispatch, useSelector } from "react-redux";

function AdminLogin() {
    if(localStorage.getItem('admin')){
        localStorage.removeItem('admin')
    }if(localStorage.getItem('Admintoken')){
        localStorage.removeItem('Admintoken')
    }if(localStorage.getItem('adminMail')){
        localStorage.removeItem('adminMail')

    }
    const history = useNavigate()
    const {email,password} = useSelector((state)=>state.AdminLogin)
    const dispatch = useDispatch()

    async function submit(e){
        e.preventDefault()
        try {
            console.log(email,password);
            await axios.post("http://localhost:8000/adminLogin",{
                email:email,password:password
            }).then(res=>{
                console.log(res);
                if(res.data ==='not Existing'){
                    alert('Invalid username or password')
                }else if(res.data === "unauthorized"){
                    alert('unauthorized')
                }else{
                    localStorage.setItem('adminMail',res.data.email)                 
                    localStorage.setItem('Admintoken',res.data.accessToken)                    
                    history('/admin')
                }
            }).catch(e=>{
                alert('worng details')
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }

  return (

  <div className="login">
    <form action="POST" method="post">
      <h1>Admin Login</h1>
      <label htmlFor="email">Email:</label>
      <input  type="email" value={email} onChange={(e)=>dispatch(setEmail(e.target.value))} placeholder="Email" />
      <label htmlFor="password">Password:</label>
      <input type="password" value={password} onChange={(e)=>{dispatch(setPassword(e.target.value))}} placeholder="password"/>
      <input type="submit" onClick={submit} value="Login"/>
      <br />
      <br />
      OR
      <br />
      <br />
    <Link className="signuplink" to={'/signup'}>SignUp</Link>
    </form>
  </div>
  )
}
export default AdminLogin