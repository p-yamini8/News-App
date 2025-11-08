const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');

const sequelize=require('./util/database')
const app=express();
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'views')));
app.use('/uploads', express.static('uploads'));

app.use('/user',userRoutes);

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'))
})


app.use('/admin',adminRoutes);
sequelize.sync().then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log('running')
})