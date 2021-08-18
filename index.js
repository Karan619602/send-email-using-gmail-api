const nodemailer=require('nodemailer')
const express=require('express')
const app=express();
const { google } = require('googleapis')
const connectdatabase =require('./config/database.js')
const Email =require('./model.js')
const {config}=require('dotenv')
app.use(express.json())



config({path:'config/.env'})
connectdatabase();
const CLIENT_ID = process.env.CLIENT_ID;
const CLEINT_SECRET = process.env.CLEINT_SECRET;
 const REDIRECT_URI = process.env.REDIRECT_URI;

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client=new google.auth.OAuth2(CLIENT_ID,CLEINT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

app.post('/getemail', async(req,res)=>{
 
    const getemail =await Email.create(req.body)
  
    res.send({
      getemail,
      REFRESH_TOKEN
  
    });
    const accessToken = await oAuth2Client.getAccessToken();

   
    
  
   console.log(getemail.email);
         
  
 
       const transport = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           type: 'OAuth2',
           
           user: 'goyalkaran619@gmail.com',
           clientId: CLIENT_ID,
           clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                access_token:accessToken,


          
         },
       });
            const mailOptions = {
              from: 'SENDER NAME <goyalkaran619@gmail.com>',
              to:getemail.email,
              subject: 'Hello from gmail using API',
              text: 'Hello from gmail email using API',
              html: '<h1>Hello from gmail email using API</h1>',
            };
        
        
          
            const result = await transport.sendMail(mailOptions);
            return result;
          
        
   
})






app.listen(4000,(err)=>{
    console.log('port start on 4000');
})