//#region import
const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/users');
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require('./passport-config');
const flash = require("express-flash");
const session = require("express-session");

//#endregion

//#region Properties
const dbURI = "mongodb+srv://quocvinguyen:zsqRZXyq2n0yA5ki@cluster-basic.levl5.mongodb.net/ReadyYetDB?retryWrites=true&w=majority";
const app = express();
const PORT = 4000;
app.use(express.urlencoded({ extended: false }));
app.use(flash())

initializePassport(
  passport,
  email => {
    User.findOne({'email' : email}, function( error, docs){
        if (error){
            return null;
        }else{
            return docs;
        }
    })
  },
  id =>{
    User.findOne({'id' : id}, function( error, docs){
        if (error){
            return null;
        }else{
            return docs;
        }
    })
    return null;
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

app.post("/login", passport.authenticate('local', {
    failureFlash: true
}), (req, res)=>{
    console.log(req)
    // try {
    //     // const harshedPwd = await bcrypt.hash(req.body.password, 10);
    //     console.log(User.findOne({'email' : req.query.email}))
    //     User.findOne({'email' : req.query.email}, function( error, docs){
    //         if (error){
    //             console.log("Error" + error);
    //             res.send(error);
    //         }else{
    //             console.log("POST Result: "+ docs.firstname);
    //             res.send("RESULT: "+ docs);
    //         }
    //     })
        
    // } catch {
        
    // }
    res.send("LOGIN SUCCESSFUL");
})

app.post("/posted", (req, res) =>{
    res.send("POSTED");
})



//#region 

app.listen(PORT);

console.log("HEE");