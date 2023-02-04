import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log('Database Connection Established ✅');
}).catch((err)=>{
  console.log('Database Not Connected ' + err)
})

/* 
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log('Connection to DB established ✅');
    }
}); */