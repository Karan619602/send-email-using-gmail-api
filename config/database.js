const mongoose =require('mongoose')
const dotenv =require('dotenv')
process.env.CONNECTION_URI
const connectdatabase=()=>{
    mongoose.connect(process.env.CONNECTION_URI ,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    }).then(con=>{
        console.log(`connect to databse :${con.connection.host}`);
    })
}

module.exports= connectdatabase