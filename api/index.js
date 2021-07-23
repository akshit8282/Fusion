const express=require('express');
const app=express();
const mongoose=require('mongoose');

const multer=require('multer');
const path = require("path");




app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect('mongodb+srv://akshit:batrag@cluster0.zypwr.mongodb.net/blog?retryWrites=true&w=majority',
 {useNewUrlParser: true,
  useFindAndModify: false,
useCreateIndex:true,
useUnifiedTopology:true,

}).then(console.log('mongodb connected')).catch(err=>console.log(err));
mongoose.set('useFindAndModify', false);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null,req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single('file'), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use('/api/auth',require('./routes/auth'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));
app.use('/api/post',require('./routes/post'));
app.use('/api/category',require('./routes/category'));
//uplaoding file

  //listen
app.listen(5000,()=>{
    console.log("app is running");
})