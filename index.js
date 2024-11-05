const express = require("express");
const { connectToDb } = require('./connectionwithmongodb');
const cors = require('cors');
require('dotenv').config();
connectToDb("mongodb://127.0.0.1:27017/hellofellowcoders") // connection String is here
const PORT = process.env.PORT || 3000;

const userRouter = require('./router/hellowfellowcoderregisterrouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users',userRouter);

app.get('/',(req,resp)=>{
    resp.send("Hello Fellow Coders server is working");
})


//server listen in the PORT
app.listen(PORT, () => {
    try {
        console.log(`The server is started on the port number ${PORT}`);
    } catch (error) {
        console.error(error);
    }
})