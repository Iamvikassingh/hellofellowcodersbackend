const mongoose = require("mongoose");
async function connectToDb(URL){
    return await mongoose.connect(URL,{
        // useNewUrlParser: true,
        // useUnifiedTopology:true,
    })
    .then(()=>{
        console.log('connection is successfull');
    })
    .catch(()=>{
        console.log('connection is failed');
    })
}

module.exports={
    connectToDb
}