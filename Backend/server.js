const { HotalRouter } = require('./Controler/Hotal.controler.js');
const { connection } = require('./Databaseconnext/Databse.js');

const express = require("express");
const app = express();
const  cors = require('cors');
const { carrouter } = require('./Controler/Car.controler.js');

app.use(express.json());
app.use(cors())
app.use(HotalRouter)
app.use(carrouter)
app.get('/',(req,res)=>{
  res.send({
    res:"hello app"
  })
})
const port = process.env.PORT || 3001;
app.listen(port, async () => {
  try {
    await connection();
    console.log("listening on port " + port);
  } catch (error) {
    console.log(error);
  }
});
