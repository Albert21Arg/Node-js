const express = require('express');
const colors = require('colors');
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB  = require("./config/db");

//dot configuracion
dotenv.config()

// DB
connectDB();


//rest object
const app = express()

const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(cors({
  origin: "https://tu-frontend.onrender.com",
  credentials: true
}));;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));



//router
//url = 
app.use('/api/v1/test', require('./routers/testRoutes'))
app.use('/api/v1/auth', require('./routers/authRoutes'))
app.use('/api/v1/user', require('./routers/userRoutes'))

app.get('/', (req, res) => {
  res.render('principal');
});

//PORT
const PORT = process.env.PORT || 8881;

//listen
app.listen(PORT,()=>{
    console.log(`Server Corriendo ${PORT}`.bgMagenta.white)
})

