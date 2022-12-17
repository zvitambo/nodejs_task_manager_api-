const connectDB = require('./db/connect');
const express = require("express");
const  taskRoutes  = require('./routes/tasks');
const notFound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorHandler");    
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(express.static('./public'))

//routes
app.use('/api/v1/tasks', taskRoutes)

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async() => {
    try {
    await connectDB(process.env.MONGO_URI).then(() =>
        console.log(`connected to the cloud server instance${process.env.DB_INSTANCE}`)
      );

    app.listen(port, () => {
      console.log(`Listening on port ${port}....`);
    });
  
      
    } catch (error) {
        console.log(error);
    }
}


start();





