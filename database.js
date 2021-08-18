const mongoose =require('mongoose')

const CONNECTION_URL='mongodb+srv://karan619:11014803119@cluster0.ivb6v.mongodb.net/calenderapp?retryWrites=true&w=majority'
const connectdatabase=()=>{
    mongoose.connect(CONNECTION_URL,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    }).then(con=>{
        console.log(`connect to databse :${con.connection.host}`);
    })
}

module.exports= connectdatabase