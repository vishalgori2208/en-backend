const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

dotenv.config({ path: './config.env' });
const app = express();
app.use(cors());
app.use(express.json());

function sendEmail(name, phone, query) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: "vishalgori2208@gmail.com",
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

app.post("/save", async (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const query = req.body.query;
    console.log(name + " " + phone + " " + query);
    try {
        await sendEmail(name, phone, query);
        res.send("success");
    }
    catch(err){
        res.send("failed");
    }
    
})

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
