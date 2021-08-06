//#region import
const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/users');
const Order = require('./models/orders');
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

async function FindUserById(id){
    const result = await User.findById(id);
    return result;
}

initializePassport(
  passport,
  FindUserByEmail,
  FindUserById
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

app.get("/add-order", async (req, res)=>{
    const newOrder = new Order({patient:[{
        firstname: "John",
        lastname: "Doe",
        email: "JohnDoeFakeEmail@faking.com",
        phonenumber: "2042919444"
    }],
    pickuptime: new Date()
});

    newOrder.save()
    .then((result) => {
        res.send("new order added");
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
    res.send();
})

app.post("/posted", (req, res) =>{
    res.send("POSTED");
})


app.get("/getssid", (req, res) =>{
    res.send(req.headers.session);

})
//#region 

app.listen(PORT);