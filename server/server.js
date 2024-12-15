// PACKAGE IMPORTS
import  express  from "express";
import mongoose from "mongoose";
import nodemailer from "nodemailer"
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

// ROUTE IMPORTS
import staffRoutes from './routes/staffRoutes.js'
import profileRoutes from './routes/profileRoutes.js'

//GENERAL CONSTANTS
const app = express();
const PORT = process.env.PORT || 5000;
const db_URI = process.env.db_URI;

//MIDDLEWARE
const corsOptions = {
    origin: ['http://localhost:5173', 'https://campus-locator.vercel.app'],
    optionsSuccessStatus: 200,
};
  

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/staffs', staffRoutes);
app.use('/auth', profileRoutes);

//DB CONFIG
const connectDB = async url => {
    await mongoose
        .connect(url)
        .then(() => console.log('Database Connected'))
        .catch(err => console.log(err))
}
app.get('/', (req, res) => {
    res.send('Server is up and running')
})

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // You can use any email service
    auth: {
      user: process.env.EMAIL_USER, // Replace with your email address
      pass: process.env.EMAIL_PASS, // Replace with your email password or app password
    },
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;
  
    const mailOptions = {
        from: process.env.EMAIL_USER, // The 'From' field should be your own email for consistency
        to: process.env.EMAIL_USER, // Your email address to receive the message
        subject: `New message from ${name}: ${subject}`, // Subject of the email
        text: `${message}\n\nFrom: ${name} (${email})`, // Plain text version
        html: `
          <h3>New message from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,  // HTML version for better formatting
      };
      
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
});
  

//PORT LISTEN
app.listen(PORT, async () => {
    await connectDB(db_URI);
    console.log(`Server started at port ${PORT}`);
})
