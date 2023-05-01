const express=require('express');
const app=express();
require('ejs')
require('./config/connexion')
const User=require('./route/user')
app.set('view engine','ejs');

app.use('/',User);

app.listen(3000,()=>{
    console.log('connecter with port 3000');
})