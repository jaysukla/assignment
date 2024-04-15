const express = require("express");
const cors = require("cors");
const Joi = require("joi");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

// Enable CORS middleware
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.send({ msg: "server is running " });
});

// Register Route
app.post("/signup", async (req, res) => {
    let { fullname, email, password, dob } = req.body;

    const schema = Joi.object({
        fullname: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        dob: Joi.date().max("now").required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message); // Sending the error message
    } else {


        let user = await prisma.user.findFirst({ where: { email } });

        if(user == null ){

            dob = dob + "T00:00:00.000Z";

            bcrypt.hash(password, 5, async function (err, hash) {
              let data = {
                fullname,
                email,
                password: hash,
                dob,
              };
              let user = await prisma.user.create({
                data,
              });
      
               res.send({ msg: "Registration successfull", user: user });  // Sending the success message along with data
            }); 
        }else{
            res.send({msg:"user already exist"})
        }



     







    }
});




// Login Route
app.post("/login",async (req,res)=>{
    let { email, password } = req.body;
  let user = await prisma.user.findFirst({ where: { email } });

  if (user != null) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        var token = jwt.sign({}, "user");
        res.cookie("utoken", token);
        console.log(req.cookies);

         res.send({ msg: "login Success" });
      } else {
         res.send({ msg: "wrong Cridentials" });
      }
    });
  } else {
     res.send({ msg: "wrong Cridentials" });
  }
})




app.listen(5050, () => {
    console.log("listening on port 5050");
});
