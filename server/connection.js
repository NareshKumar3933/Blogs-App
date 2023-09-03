const mongoose = require("mongoose");
 const MONGO_URI = 'mongodb+srv://nareshkumar:nareshkumar@cluster0.5dyoeqp.mongodb.net/blogs?retryWrites=true&w=majority'

const connectDb = async () =>{

    const connection = await mongoose.connect(MONGO_URI)

    if(connection){
        console.log("Database Connected");
    }
    else{
        console.log("Database Not Connected");
    }
}

module.exports = {connectDb}

// const mongoose = require("mongoose");

// const connectDb = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URI);
//         console.log("Database Connected");
//     } catch (error) {
//         console.error("Database Not Connected:", error);
//     }
// }

// module.exports = { connectDb };