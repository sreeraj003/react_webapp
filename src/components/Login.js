import React from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { signupEmail, signupPassword } from "../redux/sign";

function Login() {
    if(localStorage.getItem('userId')){
        localStorage.removeItem('userId')
    }else if(localStorage.getItem('token')){
        localStorage.removeItem('token')
    }
    const history = useNavigate()
    const {email,password} = useSelector((state)=>state.signup)
    
    const dispatch = useDispatch()

    async function submit(e){
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/",{
                email:email,password:password
            }).then(res=>{
                if(res.data ==='not existing'){
                    alert('user not found')
                }
                else if(res.data){
                    localStorage.setItem('userId',res.data._id)                    
                    localStorage.setItem('token',res.data.accessToken)                    
                    history('/home')
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
      <h1>Login</h1>
      <label htmlFor="email">Email:</label>
      <input  type="email" value={email} onChange={(e)=>dispatch(signupEmail(e.target.value))} placeholder="Email" />
      <label htmlFor="password">Password:</label>
      <input type="password" value={password} onChange={(e)=>{dispatch(signupPassword(e.target.value))}} placeholder="password"/>
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
export default Login