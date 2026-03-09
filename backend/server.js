const express = require("express");
const mongoose=require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const app = express( );
app.use(express.json( ));
app.use(cors( ));

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("MongoDB cONNECTED");
})
.catch((err)=>{
  console.log(err);
});

app.use("/api/auth",authRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,( )=>{
  console.log("Server Running on port ", PORT);
});