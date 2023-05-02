const express=require('express');
const cors=require('cors');
const colors=require('colors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDb = require('./config/connectDB');

//config dotenv

dotenv.config();

//database calling
connectDb();

//rest object basically adding all the functionality of express to app variable

const app   = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const PORT=8080 || process.env.PORT;

//to show someting on base url
// app.get('/',(req,res)=>{

// res.send('<h1>Hello I welcome you to the home page or root page of Smart expense sing send</h1>')
// // res.write('<h1>Hello I welcome you to the home page or root page of Smart expense</h1>')
// });


//importing userRoute kyunki user related hai.Saare routes user related hai
app.use("/api/v1/users",require("./routes/userRoute"));

//listen to the server

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
});
