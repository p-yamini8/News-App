const path=require('path');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const sequelize=require('./util/database')
const app=express();
const userRoutes=require('./routes/user')
const adminRoutes=require('./routes/admin')
const likeRoutes=require('./routes/like')
const postRoutes=require('./routes/post')
app.use(bodyParser.urlencoded({extended:false}));
const { User, Post } = require('./models/associations');


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname,'views')));



app.use('/user',userRoutes);
app.use('/like-comment',likeRoutes);
// app.use('/admin',adminRoutes);
app.use('/post', postRoutes);
app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'))
})

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Tables synced correctly'))
  .catch(err => console.error('❌ Sync error:', err));


sequelize.sync().then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log('running')
})