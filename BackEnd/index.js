//#region import
const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/users');

//#endregion

//#region Properties
const dbURI = "mongodb+srv://quocvinguyen:zsqRZXyq2n0yA5ki@cluster-basic.levl5.mongodb.net/ReadyYetDB?retryWrites=true&w=majority";
const app = express();
const PORT = 4000;
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

app.get("/add-user", (req, res)=>{
    const newUser = new User({
        firstname: "Tester",
        lastname: "Nguyen",
        email: "testernguyen@gmail.com",
        password: "abc123"
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



//#region 

app.listen(PORT);

console.log("HEE");