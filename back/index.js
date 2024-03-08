const models = require("./models/init-models");
const express = require("express");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("schedule", "ilya", "111", {
  dialect: "postgres"
});


 
const PORT = process.env.PORT || 9090;
const app = express();
const initializedModels = models.initModels(sequelize);


app.post('/api/get-lessons', async (req, res) => {
    dataToSend = initializedModels.lesson.findAll(
      {
        include: { all: true, nested: true }
      }
    );
    dataToSend = await dataToSend;
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({ data: dataToSend });
});

app.post('/api/get-lessons-by-group', async (req, res) => {
  console.log(req.query.groupId)
  dataToSend = initializedModels.lesson.findAll(
    {
      include: 
      { all: true, 
        nested: true, 
      },
      where: {studentgroup : req.query.groupId} 

    }
  );
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});


 
//app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  next();
//});

var cors = require('cors');
const classtype = require("./models/classtype");
app.use(cors());
 


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});