const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

function sendEmail(name, phone, query){
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"2021.vishal.gori@ves.ac.in",
            pass:"fdhtpejbnptgfswp"
        }
    });
    let mailOptions = {
        from:"2021.vishal.gori@ves.ac.in",
        to:"vishalgori2208@gmail.com",
        subject: "Enquiry form " + name,
        text: phone + " " + query
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
        console.log("Mail err " + err);
        else
        console.log("mail send", info.response);
    })
}

app.post("/save", (req,res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const query = req.body.query;
    console.log(name + " " + phone + " " + query);
    sendEmail(name,phone,query);
    res.send("success");
})

const port = process.env.PORT || 5000;
const server = app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});