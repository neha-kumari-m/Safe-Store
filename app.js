const express = require('express');
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db');
connectToDB();
const cookieParser = require('cookie-parser');

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/user",userRouter);
app.use(cookieParser());

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})

// Step 1: Check what changed
// git status

// 🔹 Step 2: Add only what you want
// git add style.css
// git add views/register.ejs

// 🔹 Step 3: Commit
// git commit -m "Improve input field opacity"