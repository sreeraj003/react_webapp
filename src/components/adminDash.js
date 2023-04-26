import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { setUserData } from '../redux/userData';
import { useDispatch } from 'react-redux';
function AdminDash() {
    const dispatch = useDispatch()
    const [user,setUser] = useState([])
    const [users,setUsers] = useState([])
    const [searchKey,setSearchKey] = useState('')
    const history = useNavigate()

    useEffect(()=>{
        async function dataCall(){
            const adminId = localStorage.getItem("adminMail")
            const adminToken = localStorage.getItem('Admintoken')
            axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
            await axios.get(`http://localhost:8000/dash/${adminId}`)
            .then(res=>{
                if(res.data === 'unauthorized'){      
                    history('/adminlogin')
                }else if(res.data === 'not existing'){
                    history('/adminlogin')
                }else {
                    setUser(res.data)
                    setUsers(res.data)
                }
            })
        }
        dataCall()
    },[])
console.log(users);
   const editUser = async (email) =>{
    dispatch(setUserData(email))
    history(`/viewUser?id=${email}`)
    }

    function searchData(){
        const datas = user.filter   ((elem)=>elem.name.startsWith(searchKey))
        setUsers(datas)   
    }
    

    function deleteUser(id){
        async function deleteuser(){
            await axios.delete(`http://localhost:8000/deleteUser/${id}`).then(
                window.location.reload()
            )
        }
        deleteuser(id)
    }
    return (
        <div>
             <div className="navbar">
          <Link to="/admin" className="active">
            Home
          </Link>
          <span><input type="text" style={{width:'500px',backgroundColor:'white'}} onChange={(e)=>setSearchKey(e.target.value)}  placeholder='Search' /> <button className='bg-info' onClick={searchData}>Search</button> </span>
          <Link to="/adminlogin" className="logout">
            Logout
          </Link>
        </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table style={{width:'100%',position:"relative",marginTop:'100px'}}>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                            {
                                users.map(element => (
                            <tr>
                                <td>{element.name}</td> 
                                <td>{element.email}</td>
                                <td><button onClick={()=>editUser(element.email)}> Edit</button> 
                                <button onClick={()=>deleteUser(element._id)}>Delete</button> </td>
                            </tr>
                            ))}
                             
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDash