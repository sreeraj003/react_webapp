const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/my_database',
  {
    useNewUrlParser: true
  }
).then(()=>{
    console.log('mongodb connected');
})
.catch(()=>{
    console.log("failed");
})
const newSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
    }

})

const collection = mongoose.model('collection',newSchema)

module.exports = collection 