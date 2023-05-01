const express=require('express');
const route=express.Router();
const flash=require('connect-flash')
const User=require('../module/User');
const session=require('express-session');
//route.set('view engine','ejs');
route.use(express.json());
route.use(flash());
route.use(express.urlencoded({extended:true}))

route.use(session({

    secret:'houssaine'

}))

route.get('/',(req,res)=>{

    res.render('index');

})



route.get('/welcome',(req,res)=>{
    res.render('welcome',{message:req.flash('succes')})
})

route.get('/login',(req,res)=>{
    
    
    res.render('login',{message:req.flash('message')});
})

route.post('/login',async(req,res)=>{
    try{
        console.log(req.body)
        let result=await User.findOne({username:req.body.username,password:req.body.password});
        if(!result)
        {
             const message=req.flash('message',"invalid username or password")

           return   res.redirect('/login')
        }
        req.flash('succes','succes');
        res.redirect('/welcome',);


        
    }catch(err)
    {
        res.send(err.message).status(400);
    }




})



route.get('/register',(req,res)=>{
    res.render('register',{message:req.flash('echec')});
})


route.post('/register',async(req,res)=>{

    try{

        let result=await User.findOne({username:req.body.username});
        if(result)
        {
            req.flash('echec','username already exist try with another one')
            return  res.redirect('/register')
        }
        req.flash('succes','succes')
        const user=new User(req.body);
        result=await user.save();
        res.redirect('/welcome');
        console.log(req.body);
        

    }catch(err)
    {
        res.send(err.message);
    }


})


module.exports=route;