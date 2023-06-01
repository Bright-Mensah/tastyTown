import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import userSchema from "./Schema/userSchema.js";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// mongodb connection

const connection = process.env.MONGO_DB_CONNECTION;
// const connection = "mongodb+srv://Bright:Mensah12@cluster0.x0dii2e.mongodb.net/?retryWrites=true&w=majority"

mongoose
  .connect(connection)
  .then(() => console.log("connected successfully"))
  .catch(() => console.log("something went wrong."));

app.get("/", (req, res) => {
  res.send("Welcome to tasty town server");
});

// signup
app.post("/signup", (req, res) => {
  // check if user already exist

  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((userExist) => {
      if (userExist) {
        res.send({ msg: "user already exist", status: "warning" });
      } else {
        // if user does not exist then save  the  user details
        let newUser = new userSchema({
          email: req.body.email,
          password: req.body.password,
        });

        newUser
          .save()
          .then(() =>
            res.send({ msg: "user added successfully", status: "success" })
          )
          .catch(() =>
            res.send({ msg: "Sometihng went wrong...", status: "error" })
          );
      }
    });
});

// login
app.post("/login", (req, res) => {
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((emailExist) => {
      if (emailExist) {
        // if email exist compare the password for the account with your password
        const inputPassword = req.body.password;
        if (inputPassword === emailExist.password) {
          res.send({ msg: "login successful", status: "success" });
        } else {
          res.send({
            msg: "Either email or password is incorrect",
            status: "failed",
          });
        }
      } else {
        // account does not exist
        res.send({
          msg: "There's no record with the details provided",
          status: "noAccount",
        });
      }
    });
});

// profile complete first step

app.put("/profile/:email", (req, res) => {
  userSchema
    .findOneAndUpdate(
      { email: req.params.email },
      {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        dateOfBirth: req.body.dateOfBirth,
      }
    )
    .then(() => res.send({ msg: "first step competed", status: "success" }))
    .catch(() =>
      res.send({ msg: "something went wrong ...", status: "error" })
    );
});

// profile complete second step
app.put("/profile2/:email", (req, res) => {
  userSchema
    .findOneAndUpdate(
      { email: req.params.email },
      {
        securityCode: req.body.securityCode,
        phone: req.body.phone,
        Location: req.body.location,
      }
    )
    .then(() => res.send({ msg: "second step competed", status: "success" }))
    .catch(() =>
      res.send({ msg: "something went wrong ...", status: "error" })
    );
});

// get the security code from the db
app.post("/securityCode", function (req, res) {
  userSchema
    .findOne({
      securityCode: req.body.securityCode,
    })
    .then((code) => {
      if (code) {
        // check if code matches  what the user input
        const inputCode = req.body.securityCode;
        if (code.securityCode == inputCode) {
          res.send({ msg: "Security code is correct", status: "success" });
        } else {
          res.send({
            msg: "Security code is not correct",
            status: "incorrect",
          });
        }
      } else {
        res.send({ msg: "Security code is not correct", status: "incorrect" });
      }
    })
    .catch(() => {
      res.send({ msg: "something went wrong" });
    });
});

// send email
app.post("/sendEmail", (req, res) => {
  // before sending email check whether email address exist or not

  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((emailExist) => {
      if (emailExist) {
        const generateRandomCode = Math.floor(1000 + Math.random() * 9000);
        console.log(generateRandomCode);

        const sendEmail = {
          from: "mensahokobright@gmail.com",
          to: req.body.email,
          subject: "Password Reset Code",
          text: "This is a code to reset password",
          html: `<b>Below is a code to reset your password <br> ${generateRandomCode}  </b>`,
        };

        const transporter = nodemailer.createTransport({
          service: "gmail",
          port: 465,
          secure: true,
          auth: {
            user: "mensahokobright@gmail.com",
            pass: "azppmvjolkvwtfmh",
          },
        });

        transporter.sendMail(sendEmail, function (error, info) {
          if (error) {
            console.log(error);
            res
              .status(503)
              .send({ msg: "Service Unavailable:", status: "error" });
          } else {
            userSchema
              .findOneAndUpdate(
                { email: req.body.email },
                {
                  passwordResetCode: generateRandomCode,
                }
              )
              .then(() =>
                res.status(200).send({ msg: "Mail sent:", status: "success" })
              )
              .catch(() =>
                res.send({ msg: "something went wrong ...", status: "error" })
              );

            console.log("Email sent: " + info.response);
          }
        });
      } else {
        res.status(400).send({
          msg: "there is no account associated with the email provided",
          status: "error",
        });
      }
    });
});

// find user with the code and check if code matches  the input code
app.post("/user/:email", (req, res) => {
  userSchema
    .findOne({
      email: req.params.email,
    })
    .then((result) => {
      if (result) {
        {
          req.body.code === result.passwordResetCode
            ? res.status(200).send({ msg: "Success", status: "success" })
            : res.status(400).send({ msg: "Invalid code", status: "error" });
        }
      }
    });
});

// reset password
app.put("/user/:email", function (req, res) {
  var date_time = new Date();

  var date = ("0" + date_time.getDate()).slice(-2);

  var year = date_time.getFullYear();

  var month = ("0" + (date_time.getMonth() + 1)).slice(-2);

  var hours = date_time.getHours();

  var minutes = date_time.getMinutes();

  var seconds = date_time.getSeconds();

  let updatedDate =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  userSchema
    .findOneAndUpdate(
      {
        email: req.params.email,
      },
      {
        password: req.body.password,
        updated_at: new Date(),
      }
    )
    .then((result) => {
      if (result) {
        res.send({ msg: "Password reset successfully", status: "success" });
      } else {
        res.send({
          msg: "Something went wrong. try again!!!",
          status: "error",
        });
      }
    });
});
const PORT = process.env.PORT || 4500;

app.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`));
