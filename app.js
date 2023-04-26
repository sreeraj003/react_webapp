const express = require('express');
const cors = require('cors');
const collection = require('./mongo');
const app = express();
const path = require('path')
const upload = require('./middleware/multer');
const cookieParser = require('cookie-parser');
const {createTokens,validateToken,validateAdminToken,createAdminToken} = require('./jwt')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:3000'
  }));
// console.log(path.join(__dirname));
app.use (cookieParser())
app.use('/imags',express.static('imags'))

const credentials = {
    email : "admin@gmail.com",
    password : '123456'
}


app.get('/userProfile',validateToken,async(req,res)=>{
    if(req.user.id){
        const data = await collection.findOne({_id:req.user.id})
        res.json(data)
    }else{
        res.json('unauthorized')
    }
})

app.post('/',async(req,res)=>{
    const{email}=req.body
    try {
        const check = await collection.findOne({email:email})
        if(check){
            const accessToken = createTokens(check)
            res.json({...check._doc,accessToken})
        }else{
            res.json('not existing')
        }
    } catch (error) {
        res.json('not existing')
    }
})

app.post('/adminLogin',async(req,res)=>{
    const {email,password} = req.body
    // console.log(email,password+'-----'+credentials.email);
    try {
        const check = req.body
        if(email === credentials.email && password === credentials.password){
            // const check = await collection.find()
            // if(check!=null){
                const accessToken = createAdminToken(check)
                // console.log({email,accessToken});
                res.json({email,accessToken})
            // }else{
            //     res.json('not Existing')
            // }
        }else{
            res.json('not Existing')
        }
    } catch (error) {
        res.json("not Existing")
    }
    
})


app.post('/signup',async(req,res)=>{
    const{name,age,email,password}=req.body
    const data = {
        name:name,
        age:age,
        email:email,
        password:password

    }
    try {
        const check = await collection.findOne({email:email})
        if(check){
            res.json('exist')
        }else{
            await collection.insertMany(data)
            res.json("not existing")
        }
    } catch (error) {
        res.json('existing')

    }
})

app.get('/homedata/:user',validateToken,async(req,res)=>{
    const id = req.params.user
    const data = await collection.findOne({_id:id})
    res.json(data)
})

app.post('/ProfileUpdate',upload.single('image'),async(req,res)=>{
    const {name,age,email} = req.body
    // console.log(req.file.filename);
    if(req.file){
        await collection.findOneAndUpdate({email:email},{$set:{name:name,age:age,image:req.file.filename}})
    }else{
        await collection.findOneAndUpdate({email:email},{$set:{name:name,age:age}})
    }
    const data = await collection.findOne({email:email})
    // console.log(data);
    res.json(data)
})

app.get('/dash/:adminId',validateAdminToken,async(req,res)=>{
    const adminId = req.params.adminId
    if(adminId===credentials.email){
        const data = await collection.find()
        res.json(data)
    }
})

app.get('/adminUserData/:id',validateAdminToken,async(req,res)=>{
    const userId = req.params.id
    const userData = await collection.find({email:userId})
    res.json(userData)
})

app.post('/editUser',upload.single('image'),async(req,res)=>{
    console.log(req.body,req.file);
    const {name,age,email } = req.body
    if(req.file){
        await collection.findOneAndUpdate({email:email},{$set:{name:name,age:age,image:req.file.filename}})
    }else{
        await collection.findOneAndUpdate({email:email},{$set:{name:name,age:age}})
    }
    const data = await collection.find({email:email})
    res.json(data)
})

app.delete('/deleteUser/:id',async(req,res)=>{
    const id = req.params.id
    
    await collection.deleteOne({_id:id})
    res.json('success')
})

app.listen(8000,()=>{
    console.log('port connected');
})
