//#region import
const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/users');
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require('./passport-config');
const flash = require("express-flash");
const session = require("express-session");
const cors =  require('cors');

//#endregion

//#region Properties
const dbURI = "mongodb+srv://quocvinguyen:zsqRZXyq2n0yA5ki@cluster-basic.levl5.mongodb.net/ReadyYetDB?retryWrites=true&w=majority";
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(flash())
app.use(cors())

async function FindUserByEmail(email){
    const result = await User.findOne({'email' : email});
    return result;
}

initializePassport(
  passport,
  FindUserByEmail,
  id =>{
    User.findById(id, function(error, docs){
        if (error){
            return null;
        }else{
            return docs;
        }
    })
  }
)


app.use(session({
    secret: 'jarvis IV',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())

//#endregion

//#region DB connection
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{
    console.log("DB connected");
}).catch((error)=>{
    console.log("error: " + error)
})
//#endregion


//#region Routes
app.get("/", (req, res)=>{
    res.send("HELLO WORLD")
})

app.get("/add-user", async (req, res)=>{
    const harshedPwd = await bcrypt.hash("Mapde925",10);
    const newUser = new User({
        firstname: "Jarvis",
        lastname: "Nguyen",
        email: "charlesivnguyen4@yahoo.com",
        password: harshedPwd
    });
    newUser.save()
    .then((result) => {
        res.send("new user added");
    })
    .catch((error) => {

    });
})

app.get("/delete-all", (req, res)=>{
    User.deleteMany({}).then((result) => {
        res.send("Deleted all documents in user collection");
    })
})

app.get("/getSampleRespond", (req, res)=>{
    res.json({status: 'success'})
})

app.post("/login", passport.authenticate('local', {
    failureFlash: true
}), (req, res)=>{
    console.log(req)
    res.send("LOGIN SUCCESSFUL");
})

app.post("/posted", (req, res) =>{
    res.send("POSTED");
})



//#region 

app.listen(PORT);