const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();
const PORT = 5000 || process.env.PORT ;
// const PORT = 5000;
app.use(cors());
// Connect to§ MongoDB (replace 'your_database_uri' with your actual MongoDB URI)
mongoose.connect("mongodb+srv://Shubham:Shub123@cluster0.foy3sfb.mongodb.net/gym");
// , {useNewUrlParser: true}
// Define MongoDB schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  enrollDate: String,
  batch: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for parsing JSON
app.use(bodyParser.json());
// app.get('/',()=>{
//     console.log("welcome")
// })

console.log("welcome");
// Endpoint to enroll a user
app.post('/enroll', async (req, res) => {
  try {
    const { name, age, batch } = req.body;

    // Basic age validation
    if (age < 18 || age > 65) {
      
      return res.status(400).json({ error: 'Oops,Age must be between 18 and 65.' });
    }
    
// Create a new user
const newUser = new User({ name, age,batch });

// Save the user to the database
await newUser.save();
res.json({ success:true, message: 'Congratulations,you have enrolled successfully.' });
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false,error: 'Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});