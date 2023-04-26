import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setImage, setProfile } from '../redux/profile'
import './user.css'

function UserProfile() {
    const [image, setSelectedImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const dispatch = useDispatch()
    const history = useNavigate()
    const { data } = useSelector((state) => state.profile)
    const [localName, setLocalName] = useState();
    const [localAge, setLocalAge] = useState();
    const [localEmail, setLocalEmail] = useState();

    useEffect(() => {
        async function dataCall() {
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await axios.get(`http://localhost:8000/userProfile`)
                .then(res => {
                    if (res.data !== 'unauthorized') {
                        dispatch(setProfile(res.data))
                        setLocalName(res.data.name)
                        setLocalAge(res.data.age)
                        setLocalEmail(res.data.email)
                        
                    } else {
                        history('/')
                    }
                })
        }
        dataCall()
    }, [])

    const imageChange = (event) => {
        const imageName = (event.target.files[0]);
        setPreview(URL.createObjectURL(imageName))
        setSelectedImage(imageName)

    }
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', image)
        formData.append('name',localName)
        formData.append('age',localAge)
        formData.append('email',localEmail)
        async function saveData() {
            await axios.post("http://localhost:8000/ProfileUpdate",
                formData
            ).then(res => {
                dispatch(setImage(res.data.image))
                window.location.reload()
            })
        }
        saveData()
    }

    const logdata = useSelector(state => state.profile)
    return (
        <div className='homepage'>
            <div className="navbar">
                <Link to="/home" className="active">Home</Link>
                <Link to="/" className="logout">Logout</Link>
            </div>
            <div style={{ marginTop: 100 }}>
                <div style={{ margin: 100, borderRadius: 20, color: 'black' }}>
                    <h2 style={{ textAlign: 'center', color: 'white' }}>Profile</h2>
                    <div className='row'>
                        <form style={{ float: 'left', width: '100%', margin: 0, textAlign: 'left' }}>
                            <div className="row">
                                <div className="col-8">
                                    <label htmlFor="Name">Name</label>
                                    <input type="text" value={localName} onChange={(e)=>setLocalName(e.target.value)} />
                                    <label htmlFor="age">Age</label>
                                    <input type="number" value={localAge} onChange={(e)=>setLocalAge(e.target.value)}  />
                                    <label htmlFor="Name">Email</label>
                                    <input type="email" value={localEmail} onChange={(e)=>setLocalEmail(e.target.value)} />
                                </div>
                                <div className="col-4">
                                    <div style={{ width: '100px' }} >
                                        {preview ? <img style={{ width: '100px' }} src={preview} alt="profile" /> : <img style={{ width: '100px' }} src={`http://localhost:8000/imags/${data.image}`} alt="" />}
                                    </div>
                                    <input type="file" name='image' onChange={imageChange} />
                                    <input type="submit" onClick={handleSubmit} />
                                </div>
                            </div>
                        </form><br />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile