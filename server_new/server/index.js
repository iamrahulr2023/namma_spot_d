const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Map = require('./modules/Map'); 
const mapdata = require('./modules/Details');
const emapdata = require('./modules/EDetails');// Adjusted import
const user = require('./modules/employee')
const admin = require('./modules/admin')
const userdata = require('./modules/Userdetails')
const dotenv = require("dotenv")
const paymentRoutes = require("./routes/payment");
const confirm = require('./modules/Confirm_booking');
const cancell = require('./modules/Cancellbooking');
const completed = require('./modules/Completedbooking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const Notification = require('./modules/Notification')

const axios = require('axios');
require('dotenv').config();
const API_KEY = process.env.FAST2SMS_API_KEY;

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const otpcache = {};
const secretKey = 'your_secret_key';

app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/payment",paymentRoutes);

mongoose.connect('mongodb://localhost:27017/Admindata', { useNewUrlParser: true, useUnifiedTopology: true });




app.post('/maps', (req,res) => {
    const location = req.body.location; // Get single location from request body
    Map.findOneAndUpdate(
        {}, // Find the first document (or you can specify a specific query)
        { $push: { locations: location } }, // Append the location to the locations array
        { new: true, upsert: true } // Create the document if it doesn't exist
    )
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

/*app.get('/gett', (req, res) => {
    Map.findById('664827a4b50ea396d0c856fd')
        .then(result => res.json(result.locations))
        .catch(err => res.json(err));
});*/


/*app.get('/get', (req, res) => {
  mapdata.find({}, 'locations') // Fetch only the 'locations' field
    .then(result => {
      const locations = result.map(item => item.locations); // Extract the locations from the result
      res.json(locations);
    })
    .catch(err => res.status(500).json(err));
});*/

app.get('/get', (req, res) => {
  mapdata.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status9(500).json(err));
});



app.get('/getuserconfirmdata', (req, res) => {
  userdata.find({}).sort({ _id: -1 }).limit(1)
    .then(result => {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: "No documents found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

app.get('/getpins', (req, res) => {
  userdata.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(500).json(err));
});


/*app.post(/maps,(req,res) =>{
    const location = req.body.location;
    Map.create({
       locations :location
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})*/

app.post('/add',(req,res) =>{
  const location = req.body.locations;
  console.log(location)
  mapdata.create({
    locations :location
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})



app.post('/adddata', (req, res) => {
  const { city, place, seat, des, company, price, status } = req.body;

  mapdata.create({ 
    locations: city,
    city,
    place,
    seat,
    des,
    company,
    price,
    status
  })
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
});

app.post('/addedata', (req, res) => {
  const { city, place, seat, des, company, price } = req.body;

  emapdata.create({ 
    locations: city,  
    city,
    place,
    seat,
    des,
    company,
    price
  })
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
});

/*app.post('/adddetails', (req, res) => {
  const { slotNumbers, entryTime, exitTime, date, vehicleno, totalAmount ,pin,city} = req.body;

  userdata.create({
    slotNumbers,
    entryTime,
    exitTime,
    date,
    vehicleno,
    totalAmount,
    pin,
    city
  })
  .then(result => res.json(result))
  .catch(err => res.json(err));
});*/

app.post('/adddetails', (req, res) => {

  userdata.create(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err));
}); 


app.post('/updatepins', (req, res) => {
  const { city, slots } = req.body;

  mapdata.findOne({ city: city })
    .then(result => {
      if (result) {
        // Get existing slots and combine with new slots, ensuring no duplicates
        let existingSlots = result.slots;
        let newSlots = [...new Set([...existingSlots, ...slots.map(slot => slot.toString())])];
        
        mapdata.findOneAndUpdate(
          { city: city },
          { $set: { slots: newSlots } },
          { new: true }
        )
          .then(updatedResult => res.json(updatedResult))
          .catch(err => res.status(500).json(err));
      } else {
        // Handle the case where the city document is not found
        res.status(404).json({ message: "City not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});


/*app.post('/updatepins', (req, res) => {
  const { city, slots } = req.body;

  // Generate numeric slot names like 1, 2, 3, ...
  const generateSlotNames = (numSlots) => {
    let slotNames = [];
    for (let i = 1; i <= numSlots; i++) {
      slotNames.push(i.toString());
    }
    return slotNames;
  };

  const slotNames = slots.length > 0 ? generateSlotNames(slots.length) : [];

  mapdata.findOneAndUpdate(
    { city: city },
    { $set: { slots: slotNames } },
    { new: true }
  )
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});*/

/*app.post('/updatepins', (req, res) => {
  const { city, slotNumbers } = req.body;

  // Find the document in mapdata collection that matches the city
  mapdata.findOne({ city })
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ message: 'City not found' });
      }

      // Get the existing slots in the document
      let { slots } = doc;
      
      // Remove slotNumbers from the slots array
      slotNumbers.forEach(slot => {
        const index = slots.indexOf(slot);
        if (index !== -1) {
          slots.splice(index, 1);
        }
      });

      // Update the document with the modified slots array
      mapdata.findOneAndUpdate(
        { city: city },
        { $set: { slots } },
        { new: true }
      )
      .then(updatedDoc => {
        res.json(updatedDoc);
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});*/





/*app.get('/getseat', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  try {
    const doc = await mapdata.findOne({ city });
    if (!doc) {
      return res.status(404).send('City not found');
    }
    if (doc.seat === undefined || doc.seat === null) {
      console.error('Seat value is missing for city:', city);
      return res.status(500).send('Seat value is missing');
    }
    res.send({ seat: doc.seat, slots: doc.slots || [] });
  } catch (err) {
    console.error('Database error:', err); // Log the error
    res.status(500).send('Internal server error');
  }
});*/


app.get('/getseat', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  try {
    const doc = await mapdata.findOne({ city });
    if (!doc) {
      return res.status(404).send('City not found');
    }
    res.send({ seat: doc.seat, slots: doc.slots ,price:doc.price || [] });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Internal server error');
  }
});


//veri 
app.get('/getpins', (req, res) => {
  userdata.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/freeupslots', (req, res) => {
  const { pin, seatsToFree } = req.body;

  userdata.findOne({ pin: pin })
    .then(user => {
      if (user) {
        const city = user.city;

        mapdata.findOne({ city: city })
          .then(map => {
            if (map) {
              const updatedSlots = map.slots.filter(slot => !seatsToFree.includes(slot));

              mapdata.findOneAndUpdate(
                { city: city },
                { $set: { slots: updatedSlots } },
                { new: true }
              )
                .then(updatedMap => res.json(updatedMap))
                .catch(err => res.status(500).json(err));
            } else {
              res.status(404).json({ message: "City not found in mapdata" });
            }
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "PIN not found in userdata" });
      }
    })
    .catch(err => res.status(500).json(err));
});

///


// Route to get the last added document's name from userdata

// Route to get the last added user data
app.get('/getuserdata', (req, res) => {
  userdata.findOne({}).sort({ _id: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Route to post the confirm booking
app.post('/postconfirmbooking', (req, res) => {

  confirm.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});



app.get('/getconfirmb', (req, res) => {
  confirm.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.get('/getconfirmbo', (req, res) => {
  confirm.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.delete('/deleteupcoming/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/cancellbooking', (req, res) => {
  cancell.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.get('/getcancelledbo', (req, res) => {
  cancell.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

 



app.delete('/upcomingbooking/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/completed booking', (req, res) => {
  completed.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});
///
app.delete('/upcomingbooking/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/completedbooking', (req, res) => {
  completed.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/putnoti', (req, res) => {
  const { noti } = req.body;
  const currentDate = new Date().toISOString();

  Notification.create({
    noti: noti,
    date: currentDate,
  })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

/*app.get('/getnoti', (req, res) => {
  Notification.find().sort({ date: -1 }) // Fetch all notifications sorted by date
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/deletenoti/:id', (req, res) => {
  Notification.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});*/

// Get all notifications sorted by date in descending order
app.get('/getnoti', (req, res) => {
  Notification.find().sort({ date: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Delete a specific notification by ID
app.delete('/deletenoti/:id', (req, res) => {
  Notification.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Get all user numbers sorted by date in descending order


//


  ///////////logins


  /////login



// Connect to MongoDB

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    number: String,
    date: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

function generateOTP() {
    return randomstring.generate({ length: 4, charset: 'numeric' });
}

function sendOTP(email, otp) {
    const mailOptions = {
        from: 'Namma Spot-Parking <thamilarasan0026@gmail.com>',
        to: email,
        subject: 'OTP Verification',
        text: `Dear User,

        Thank you for registering with Namma Spot Parking. To complete your registration and verify your email address, please use the following One-Time Password (OTP):
        
        Your OTP Code: [ ${otp} ]
        
        Please enter this code in the verification field on the Namma Spot Parking  website .
        
        Note: This OTP is valid for Few minutes. If you did not request this verification, please ignore this email.
        
        If you have any questions or need further assistance, feel free to contact our support team at [support@.nammaspotparkingcom].
        
        Thank you,
        
        Best regards,
        
        NAMMA SPOT PARKING`
    };

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'thamilarasan0026@gmail.com',
            pass: 'hhzy xkwx ujfb hewm'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error Occurred:', error);
        } else {
            console.log('OTP Email Sent Successfully:', info.response);
        }
    });
}
app.post('/reqOTP', (req, res) => {
  const { email } = req.body;
  console.log(`Received OTP request for email: ${email}`);
  const otp = generateOTP();
  otpcache[email] = otp;

  sendOTP(email, otp);
  res.status(200).json({ message: 'OTP Sent Successfully' });
});
app.post('/verifyOTP', async (req, res) => {
  const { email, otp, name, password, number } = req.body;
  console.log(`Verifying OTP for email: ${email} with OTP: ${otp}`);
  if (!otpcache.hasOwnProperty(email)) {
      return res.status(400).json({ message: 'Email not found' });
  }
  if (otpcache[email] === otp.trim()) {
      delete otpcache[email];
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, number });
      await newUser.save();
      return res.status(200).json({ message: 'OTP Verified Successfully' });
  } else {
      return res.status(400).json({ message: 'Invalid OTP' });
  }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ status: 'ok', token });
});

app.get('/api/quote', (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, secretKey);
        // Simulated quote data
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
            "The journey of a thousand miles begins with one step. - Lao Tzu"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.status(200).json({ status: 'ok', quote: randomQuote });
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
});



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

///admin

app.post("/alogin" ,(req,res)=>{
  const {email , pass} =req.body;
  admin.findOne({email :email})
  .then(user =>{
    if(user){
      if(user.pass === pass){
        res.json("success")
      }
      else{
        res.json("incorrect pass")
      }
    }
    else{
      res.json("invalid email")
    }
  })
  .catch(err => res.json(err))

})


app.post('/aregister',  (req, res) => {
  const data =req.body ;
  console.log(data)
  admin.create(data)
  .then(employee => res.json(employee))
  .catch(err => res.json(err))
  
});


////review

/*app.post('/review', (req, res) =>{
 

  const { header, body,starcount } = req.body;
  ReviewModel.create({ cityd ,header, body,starcount})   
      .then(result => res.json(result))
      .catch(err => res.json(err));
})*/

/*app.post('/review', async (req, res) => {
  const { cityd, header, body, starcount } = req.body;

  try {
    const cityDocument = await mapdata.findOne({ city: cityd });

    if (cityDocument) {
      cityDocument.reviews.push({ header, body, starcount });
      const updatedDocument = await cityDocument.save();
      res.json(updatedDocument);
    } else {
      res.status(404).send('City not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

app.get('/getname', (req, res) => {
  User.findOne({}).sort({ _id: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


/*
app.post('/updateprofile', (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  User.findByIdAndUpdate(id, { name: firstName + ' ' + lastName, email: email }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});*/

app.post('/updateprofile', (req, res) => {
  const { id, firstName, lastName, password } = req.body;
  User.findByIdAndUpdate(id, { 
    name: firstName + ' ' + lastName, 
    password: password 
  }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

//admin profile
app.get('/getaname', (req, res) => {
  admin.findOne({}).sort({ _id: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/updateaprofile', (req, res) => {
  const { id, firstName, lastName, pass } = req.body;
  admin.findByIdAndUpdate(id, { 
    name: firstName + ' ' + lastName, 
    pass: pass 
  }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.get('/getnumber', (req, res) => {
  User.findOne().sort({ number: -1 }) // Find the latest user by date
    .then(result => {
      if (result) {
        res.json({ number: result.number });
      } else {
        res.status(404).json({ message: 'No users found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

app.post('/sendNotification', (req, res) => {
  const { number, message } = req.body;

  const url = 'https://www.fast2sms.com/dev/bulkV2';
  const data = {
    message:`
🎉 Namma Spot Exclusive Alert!

 Congratulations! ${message} now officially in the  park

   ` 
    ,
    language: 'english',
    route: 'q',
    numbers: number
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': API_KEY
  };

  axios.post(url, data, { headers: headers })
    .then((response) => {
      if (response.data.return) {
        res.status(200).json({ message: 'Message sent successfully', response: response.data });
      } else {
        res.status(400).json({ message: 'Error sending message', response: response.data.message });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error sending message', error: error.response ? error.response.data : error.message });
    });
});


app.post('/review', async (req, res) => {
  const { cityd, header, body, starcount } = req.body;

  try {
    const cityDocument = await mapdata.findOne({ city: cityd });

    if (cityDocument) {
      cityDocument.reviews.push({ header, body, starcount });

      // Calculate the average rating for the city
      const totalReviews = cityDocument.reviews.length;
      const totalRating = cityDocument.reviews.reduce((acc, review) => acc + review.starcount, 0);
      const averageRate = totalReviews > 0 ? totalRating / totalReviews : 0;
      cityDocument.averagerate = averageRate; // Update the average rate field
      
      const updatedDocument = await cityDocument.save();
      res.json(updatedDocument);
    } else {
      res.status(404).send('City not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getmapslots', async (req, res) => {
  try {
    const slots = await mapdata.find({}).sort({ _id: -1 }).limit(2);
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a document by ID
app.put('/getmapslots/:id', async (req, res) => {
  try {
    const updatedSlot = await mapdata.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a document by ID
app.delete('/getmapslots/:id', async (req, res) => {
  try {
    await mapdata.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});


/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Map = require('./modules/Map'); 
const mapdata = require('./modules/Details');// Adjusted import
const user = require('./modules/employee')
const admin = require('./modules/admin')
const userdata = require('./modules/Userdetails')
const dotenv = require("dotenv")
const paymentRoutes = require("./routes/payment");
const confirm = require('./modules/Confirm_booking');
const cancell = require('./modules/Cancellbooking');
const completed = require('./modules/Completedbooking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

const Notification = require('./modules/Notification')

const app = express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const otpcache = {};
const secretKey = 'your_secret_key';

app.use(express.json());
app.use(cors());
dotenv.config();
app.use("/api/payment",paymentRoutes);

mongoose.connect('mongodb://localhost:27017/Admindata', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/maps', (req,res) => {
    const location = req.body.location; // Get single location from request body
    Map.findOneAndUpdate(
        {}, // Find the first document (or you can specify a specific query)
        { $push: { locations: location } }, // Append the location to the locations array
        { new: true, upsert: true } // Create the document if it doesn't exist
    )
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

/*app.get('/gett', (req, res) => {
    Map.findById('664827a4b50ea396d0c856fd')
        .then(result => res.json(result.locations))
        .catch(err => res.json(err));
});*/


/*app.get('/get', (req, res) => {
  mapdata.find({}, 'locations') // Fetch only the 'locations' field
    .then(result => {
      const locations = result.map(item => item.locations); // Extract the locations from the result
      res.json(locations);
    })
    .catch(err => res.status(500).json(err));
});*/
/*
app.get('/get', (req, res) => {
  mapdata.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status9(500).json(err));
});



app.get('/getuserconfirmdata', (req, res) => {
  userdata.find({}).sort({ _id: -1 }).limit(1)
    .then(result => {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: "No documents found" });
      }
    })
    .catch(err => res.status(500).json(err));
});

app.get('/getpins', (req, res) => {
  userdata.find({})
    .then(result => {
      res.json(result);
    })
    .catch(err => res.status(500).json(err));
});


/*app.post(/maps,(req,res) =>{
    const location = req.body.location;
    Map.create({
       locations :location
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})*/
/*
app.post('/add',(req,res) =>{
  const location = req.body.locations;
  console.log(location)
  mapdata.create({
    locations :location
  }).then(result => res.json(result))
  .catch(err => res.json(err))
})



app.post('/adddata', (req, res) => {
  const { city, place, seat, des, company, price } = req.body;

  mapdata.create({ 
    locations: city,
    city,
    place,
    seat,
    des,
    company,
    price
  })
  .then(result => res.json(result))
  .catch(err => res.status(500).json(err));
});

/*app.post('/adddetails', (req, res) => {
  const { slotNumbers, entryTime, exitTime, date, vehicleno, totalAmount ,pin,city} = req.body;

  userdata.create({
    slotNumbers,
    entryTime,
    exitTime,
    date,
    vehicleno,
    totalAmount,
    pin,
    city
  })
  .then(result => res.json(result))
  .catch(err => res.json(err));
});*/
/*
app.post('/adddetails', (req, res) => {

  userdata.create(req.body)
  .then(result => res.json(result))
  .catch(err => res.json(err));
}); 


app.post('/updatepins', (req, res) => {
  const { city, slots } = req.body;

  mapdata.findOne({ city: city })
    .then(result => {
      if (result) {
        // Get existing slots and combine with new slots, ensuring no duplicates
        let existingSlots = result.slots;
        let newSlots = [...new Set([...existingSlots, ...slots.map(slot => slot.toString())])];
        
        mapdata.findOneAndUpdate(
          { city: city },
          { $set: { slots: newSlots } },
          { new: true }
        )
          .then(updatedResult => res.json(updatedResult))
          .catch(err => res.status(500).json(err));
      } else {
        // Handle the case where the city document is not found
        res.status(404).json({ message: "City not found" });
      }
    })
    .catch(err => res.status(500).json(err));
});


/*app.post('/updatepins', (req, res) => {
  const { city, slots } = req.body;

  // Generate numeric slot names like 1, 2, 3, ...
  const generateSlotNames = (numSlots) => {
    let slotNames = [];
    for (let i = 1; i <= numSlots; i++) {
      slotNames.push(i.toString());
    }
    return slotNames;
  };

  const slotNames = slots.length > 0 ? generateSlotNames(slots.length) : [];

  mapdata.findOneAndUpdate(
    { city: city },
    { $set: { slots: slotNames } },
    { new: true }
  )
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});*/

/*app.post('/updatepins', (req, res) => {
  const { city, slotNumbers } = req.body;

  // Find the document in mapdata collection that matches the city
  mapdata.findOne({ city })
    .then(doc => {
      if (!doc) {
        return res.status(404).json({ message: 'City not found' });
      }

      // Get the existing slots in the document
      let { slots } = doc;
      
      // Remove slotNumbers from the slots array
      slotNumbers.forEach(slot => {
        const index = slots.indexOf(slot);
        if (index !== -1) {
          slots.splice(index, 1);
        }
      });

      // Update the document with the modified slots array
      mapdata.findOneAndUpdate(
        { city: city },
        { $set: { slots } },
        { new: true }
      )
      .then(updatedDoc => {
        res.json(updatedDoc);
      })
      .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});*/





/*app.get('/getseat', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  try {
    const doc = await mapdata.findOne({ city });
    if (!doc) {
      return res.status(404).send('City not found');
    }
    if (doc.seat === undefined || doc.seat === null) {
      console.error('Seat value is missing for city:', city);
      return res.status(500).send('Seat value is missing');
    }
    res.send({ seat: doc.seat, slots: doc.slots || [] });
  } catch (err) {
    console.error('Database error:', err); // Log the error
    res.status(500).send('Internal server error');
  }
});*/

/*
app.get('/getseat', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  try {
    const doc = await mapdata.findOne({ city });
    if (!doc) {
      return res.status(404).send('City not found');
    }
    res.send({ seat: doc.seat, slots: doc.slots || [] });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Internal server error');
  }
});


//veri 
app.get('/getpins', (req, res) => {
  userdata.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/freeupslots', (req, res) => {
  const { pin, seatsToFree } = req.body;

  userdata.findOne({ pin: pin })
    .then(user => {
      if (user) {
        const city = user.city;

        mapdata.findOne({ city: city })
          .then(map => {
            if (map) {
              const updatedSlots = map.slots.filter(slot => !seatsToFree.includes(slot));

              mapdata.findOneAndUpdate(
                { city: city },
                { $set: { slots: updatedSlots } },
                { new: true }
              )
                .then(updatedMap => res.json(updatedMap))
                .catch(err => res.status(500).json(err));
            } else {
              res.status(404).json({ message: "City not found in mapdata" });
            }
          })
          .catch(err => res.status(500).json(err));
      } else {
        res.status(404).json({ message: "PIN not found in userdata" });
      }
    })
    .catch(err => res.status(500).json(err));
});

///


// Route to get the last added document's name from userdata
app.get('/getname', (req, res) => {
  user.findOne({}).sort({ _id: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Route to get the last added user data
app.get('/getuserdata', (req, res) => {
  userdata.findOne({}).sort({ _id: -1 })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

// Route to post the confirm booking
app.post('/postconfirmbooking', (req, res) => {

  confirm.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});



app.get('/getconfirmb', (req, res) => {
  confirm.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.get('/getconfirmbo', (req, res) => {
  confirm.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.delete('/deleteupcoming/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/cancellbooking', (req, res) => {
  cancell.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});


app.get('/getcancelledbo', (req, res) => {
  cancell.find({})
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

 



app.delete('/upcomingbooking/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/completed booking', (req, res) => {
  completed.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});
///
app.delete('/upcomingbooking/:id', (req, res) => {
  const bookingId = req.params.id;
  confirm.findByIdAndDelete(bookingId)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/completedbooking', (req, res) => {
  completed.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

app.post('/putnoti', (req, res) => {
  const { noti } = req.body;
  const currentDate = new Date().toISOString();

  Notification.create({
    noti: noti,
    date: currentDate,
  })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.get('/getnoti', (req, res) => {
  Notification.find().sort({ date: -1 }) // Fetch all notifications sorted by date
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/deletenoti/:id', (req, res) => {
  Notification.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

//


  ///////////logins


  /////login



// Connect to MongoDB

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model('User', userSchema);

function generateOTP() {
    return randomstring.generate({ length: 4, charset: 'numeric' });
}

function sendOTP(email, otp) {
    const mailOptions = {
        from: 'Namma Spot-Parking <thamilarasan0026@gmail.com>',
        to: email,
        subject: 'OTP Verification',
        text: `Dear User,

        Thank you for registering with Namma Spot Parking. To complete your registration and verify your email address, please use the following One-Time Password (OTP):
        
        Your OTP Code: [ ${otp} ]
        
        Please enter this code in the verification field on the Namma Spot Parking  website .
        
        Note: This OTP is valid for Few minutes. If you did not request this verification, please ignore this email.
        
        If you have any questions or need further assistance, feel free to contact our support team at [support@.nammaspotparkingcom].
        
        Thank you,
        
        Best regards,
        
        NAMMA SPOT PARKING`
    };

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'thamilarasan0026@gmail.com',
            pass: 'kzau flpt qlya wfrh'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error Occurred:', error);
        } else {
            console.log('OTP Email Sent Successfully:', info.response);
        }
    });
}

app.post('/reqOTP', (req, res) => {
    const { email } = req.body;
    console.log(`Received OTP request for email: ${email}`);
    const otp = generateOTP();
    otpcache[email] = otp;

    sendOTP(email, otp);
    res.status(200).json({ message: 'OTP Sent Successfully' });
});

app.post('/verifyOTP', async (req, res) => {
    const { email, otp, name, password } = req.body;
    console.log(`Verifying OTP for email: ${email} with OTP: ${otp}`);
    if (!otpcache.hasOwnProperty(email)) {
        return res.status(400).json({ message: 'Email not found' });
    }
    if (otpcache[email] === otp.trim()) {
        delete otpcache[email];
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ message: 'OTP Verified Successfully' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ status: 'ok', token });
});

app.get('/api/quote', (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, secretKey);
        // Simulated quote data
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
            "The journey of a thousand miles begins with one step. - Lao Tzu"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        res.status(200).json({ status: 'ok', quote: randomQuote });
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Unauthorized' });
    }
});
app.post('/review', async (req, res) => {
  const { cityd, header, body, starcount } = req.body;

  try {
    const cityDocument = await mapdata.findOne({ city: cityd });

    if (cityDocument) {
      cityDocument.reviews.push({ header, body, starcount });

      // Calculate the average rating for the city
      const totalReviews = cityDocument.reviews.length;
      const totalRating = cityDocument.reviews.reduce((acc, review) => acc + review.starcount, 0);
      const averageRate = totalReviews > 0 ? totalRating / totalReviews : 0;
      cityDocument.averagerate = averageRate; // Update the average rate field
      
      const updatedDocument = await cityDocument.save();
      res.json(updatedDocument);
    } else {
      res.status(404).send('City not found');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
*/

app.post('/verifyOTPnew', async (req, res) => {
  const { email, otp } = req.body;
  console.log(`Verifying OTP for email: ${email} with OTP: ${otp}`);

  
  // Assuming otpcache is defined and initialized somewhere in your code
  if (!otpcache.hasOwnProperty(email)) {
      return res.status(400).json({ message: 'Email not found' });
  }
  
  if (otpcache[email] === otp.trim()) {
      delete otpcache[email];
      return res.status(200).json({ message: 'OTP Verified Successfully' });
  } else {
      return res.status(400).json({ message: 'Invalid OTP' });
  }
});