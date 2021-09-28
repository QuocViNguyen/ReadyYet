//#region import
const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/users');
const Order = require('./models/orders');
const Pharmacy = require('./models/pharmacies');
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());
app.use(cors());

mongoose.set('useFindAndModify', false);

async function FindUserByEmail(email){
    const result = await User.findOne({'email' : email});
    return result;
}

async function FindUserById(id){
    const result = await User.findById(id);
    return result;
}

async function GetOrders(){
    const orders = await Order.find();
    return orders;
}

async function GetPharmacies(){
    const pharmacies = await Pharmacy.find();
    return pharmacies;
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
    const harshedPwd = await bcrypt.hash("anhyeuem2202",10);
    const newUser = new User({
        firstname: "Lena",
        lastname: "Dao",
        email: "2202@yahoo.com",
        password: harshedPwd
    });
    newUser.save()
    .then((result) => {
        res.send("new user added");
    })
    .catch((error) => {

    });
})

app.post("/add-order", async (req, res)=>{
    const newOrder = new Order({patient:[{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        description: req.body.description
    }],
    pickuptime: req.body.pickuptime
});

    newOrder.save()
    .then((result) => {
        res.send("SUCCESS");
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
    res.send();
})

app.get("/getssid", (req, res) =>{
    res.send(req.query.firstname);
})

app.get("/getOrders", async (req, res) =>{
    const orders = await GetOrders();
    res.send(orders);
})

app.post("/addPhamarcy", async (req, res) =>{
    const newPharmacy = new Pharmacy({
        name: 'US Pharmacy',
        location: 'Some where in the US',
        phonenumber: '2142325545'
    })
    newPharmacy.save().then((result) =>{
        res.send("New Pharmacy Added");
    })
    .catch((error) =>{
        res.send(error)
    })
})

app.get("/getPharmacies", async (req, res) =>{
    const pharmacies = await GetPharmacies();
    res.send(pharmacies);
})

app.post("/deleteSelectedOrders", async (req, res) =>{
    let selectedOrders = JSON.parse(req.body.selectedOrders);
    selectedOrders.forEach(element => {
        Order.findByIdAndRemove(element).then((result)=>{
            console.log("deleted " + element);
            res.send("SUCCESS");
        })
    });
})

app.post("/getOrdersByEmail", async (req, res) =>{
    let email = req.body.email;
    var orders = await Order.find({'patient.email' : email});
    console.log(req.params);
    res.send(orders);

})
//#region 

app.listen(PORT);