import React from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupName,signupPassword,signupAge,signupEmail } from "../redux/sign";


function Signup() {
    const history = useNavigate()
    const {name,age,email,password} = useSelector(state=>state.signup )
    const dispatch = useDispatch()
    const data = useSelector(state=>state.signup)

    async function submit(e){
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/signup",{
                name:name,
                age:age,
                email:email,
                password:password
            }).then(res=>{
                if(res.data ==='exist'){
                    alert('user alreaduy exist')
                }
                else if(res.data ==='not existing'){
                    history('/')
                }
            }).catch(e=>{
                alert(e.message)
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }

  return (

    <div className="Signup">
    <form action="POST" method="post">
      <h1>Signup</h1>
      <label htmlFor="name">Name:</label>
      <input  type="text" value = {data.name} onChange={(e)=>{dispatch(signupName(e.target.value))}} placeholder="Name" />
      <label htmlFor="age">Age:</label>
      <input  type="number" value = {data.age} onChange={(e)=>{dispatch(signupAge(e.target.value))}} placeholder="Age" />
      <label htmlFor="email">Email:</label>
      <input  type="email" value = {data.email} onChange={(e)=>{dispatch(signupEmail(e.target.value))}} placeholder="Email" />
      <label htmlFor="password">Password:</label>
      <input type="password" value = {data.password} onChange={(e)=>{dispatch(signupPassword(e.target.value))}} placeholder="password"/>
      <input type="submit" onClick={submit} value="Signup"/>
      <br />
      <br />
      OR
      <br />
      <br />
    <Link className="signuplink" to={'/'}>Login</Link>
    </form>
  </div>
  )
}

export default Signup