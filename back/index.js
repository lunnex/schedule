const models = require("./models/init-models");
const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("schedule", "ilya", "111", {
  dialect: "postgres"
});


 
const PORT = process.env.PORT || 9090;
const app = express();
const initializedModels = models.initModels(sequelize);


app.get('/api/lessons', async (req, res) => {
    dataToSend = initializedModels.lesson.findAll();
    dataToSend = await dataToSend;
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({ data: dataToSend });
});


 
//app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  next();
//});

var cors = require('cors');
app.use(cors());
 


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});