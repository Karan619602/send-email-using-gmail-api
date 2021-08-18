const nodemailer=require('nodemailer')
const express=require('express')
const app=express();
const { google } = require('googleapis')
const connectdatabase =require('./database.js')
const Email =require('./model.js')
app.use(express.json())


var email;

connectdatabase();
const CLIENT_ID = '708551692016-4bg21h28g3af8381fvn50drd1f4vtkij.apps.googleusercontent.com';
const CLEINT_SECRET = 'xNwYPsRrQ1PXz5HTjUnzHXgK';
 const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04KTkE8q1BsFOCgYIARAAGAQSNwF-L9Ir8MI31OxYpV28w3hFv5j6en2kk_2kI_cpc5d1t8l0Q_p_cvEXkODg-W6JGrs8zVSE_Jc';
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