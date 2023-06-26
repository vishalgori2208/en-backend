const express = require("express");
const cors = require("cors");
// const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

// dotenv.config({ path: './config.env' });
const app = express();
app.use(cors());
app.use(express.json());

async function sendEmail(name, phone, query) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "2021.vishal.gori@ves.ac.in",
            pass: "fdhtpejbnptgfswp"
        }
    });
    let mailOptions = {
        from: "2021.vishal.gori@ves.ac.in",
        to: "vishalgori2208@gmail.com",
        subject: "Enquiry form " + name,
        text: phone + " " + query
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log("Mail err " + err);
        else
            console.log("mail send", info.response);
    })
}

app.get('/',(req,res)=>{
    res.status(200).json({
        status:'Success',
        message:'Your api is working fine'
    })
})

app.post("/save", async (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const query = req.body.query;
    console.log(name + " " + phone + " " + query);
    try {
        sendEmail(name, phone, query);
        res.send("success");
    }
    catch(err){
        res.send("failed");
    }
    
})

app.all('*',(req,res)=>{
    res.status(400).json({
        status:'fail',
        message:'An unexpected error has occured'
    })
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
