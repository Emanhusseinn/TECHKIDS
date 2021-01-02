var express = require('express');
var morgan = require('morgan')
var cors = require('cors')
var app = express();
const path = require('path');

//the Routes
const authRoutes = require('./routes/auth');
const courseRoute = require('./routes/courseRoute');
const userRoute=require('./routes/userRoute');
const teacherRoute=require('./routes/teacherRoute');
const materialsRouter = require('./routes/materials');

require('dotenv').config();

app.use(cors())
app.use(express.json()); 
///

app.use(morgan('dev'));

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true ,useFindAndModify:false}
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});



// MIDDILWARES
app.use('/api',authRoutes);
app.use('/course',courseRoute);
app.use('/user',userRoute);
app.use('/teacher',teacherRoute);
app.use('/materials', materialsRouter);

// serve static assets if were in production 
if(process.env.NOD_ENV === 'production'){
  // set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));

  });
}


//port with whatever the port will be given by heruko
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

