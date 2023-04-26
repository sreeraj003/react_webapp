import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function ViewUser() {
    const [image,setSelectedImage] = useState(null)
    const [preview,setPreview] = useState(null)
    const [user, setUser] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const adminToken = localStorage.getItem('Admintoken')
const history = useNavigate()
  useEffect(() => {
    async function userData(id) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${adminToken}`;
      await axios.get(`http://localhost:8000/adminUserData/${id}`)
        .then((res) => {
            if(res.data==='unauthorized'){
                history('/adminlogin')
            }
            console.log(res.data);
          console.log(res.data[0].name);
          setUser(res.data);
          setLocalName(res.data[0].name)
          setLocalAge(res.data[0].age)
          setLocalEmail(res.data[0].email)
        });
    }
    userData(id);

  }, []);
  const [localName, setLocalName] = useState();
const [localAge, setLocalAge] = useState();
const [localEmail, setLocalEmail] = useState();
  const imageChange = (event) => {
    const imageName = (event.target.files[0]);
    setPreview(URL.createObjectURL(imageName))
    setSelectedImage(imageName)
}

// console.log(name);

function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name',localName)
    formData.append('age',localAge)
    formData.append('email',localEmail)
    formData.append('image', image)

    
    async function saveData() {
        
        await axios.post("http://localhost:8000/editUser",
            formData
        ).then(res => {
            setUser(res.data)
            window.location.reload()
        })
    }
    saveData()
}
  return (
    <div>
      <div className="homepage">
        <div className="navbar">
          <Link to="/admin" className="active">
            Home
          </Link>
          <Link to="/adminlogin" className="logout">
            Logout
          </Link>
        </div>
        <div style={{ marginTop: 100 }}>
          <div style={{ margin: 100, borderRadius: 20, color: "black" }}>
            <h2 style={{ textAlign: "center", color: "white" }}>Profile</h2>
            <div className="row">
              <form
                style={{
                  float: "left",
                  width: "100%",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                {user.map((element) => (
                  <div className="row">
                    <div className="col-8">
                      <label htmlFor="Name">Name</label>
                      <input type="text" value={localName} onChange={(e)=>setLocalName(e.target.value)} placeholder={element.name} />
                      <label htmlFor="age">Age</label>
                      <input type="number" value={localAge} onChange={(e)=>setLocalAge(e.target.value)}  placeholder={element.age} />
                      <label htmlFor="Name">Email</label>
                      <input type="email" value={localEmail} onChange={(e)=>setLocalEmail(e.target.value)} placeholder={element.email} />
                    </div>
                    <div className="col-4">
                      <div style={{ width: "100px" }}>
                      {preview ? <img style={{ width: '100px' }} src={preview} alt="profile" /> : <img style={{ width: '100px' }} src={`http://localhost:8000/imags/${element.image}`} alt="" />}

                      </div>
                      <input type="file" name="image" onChange={imageChange} />
                      <input type="submit" onClick={handleSubmit} />
                    </div>
                  </div>
                ))}
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
