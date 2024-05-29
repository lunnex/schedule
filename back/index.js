const models = require("./models/init-models");
const express = require("express");
const qs = require("qs")
const Sequelize = require("sequelize");
const sequelize = new Sequelize("schedule", "ilya", "111", {
  dialect: "postgres"
});
//const Lesson  = require('./models/lesson');
const bodyParser = require('body-parser');


 
const PORT = process.env.PORT || 9090;
const app = express();
const initializedModels = models.initModels(sequelize);

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));



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

app.post('/api/get-classroom', async (req, res) => {
  dataToSend = initializedModels.classroom.findAll(
    {
      include: { all: true, nested: true }
    }
  );
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/get-semestr', async (req, res) => {
  dataToSend = initializedModels.semestr.findAll(
    {
      where: {id : req.query.id} 
    }
  );
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/get-classtype', async (req, res) => {
  dataToSend = initializedModels.classtype.findAll({});
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/get-staff', async (req, res) => {
  dataToSend = initializedModels.staff.findAll(
    {
      include: { all: true, nested: true }
    }
  );
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/get-studentgroup', async (req, res) => {
  dataToSend = initializedModels.studentgroup.findAll();
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/get-subject', async (req, res) => {
  dataToSend = initializedModels.subject.findAll();
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/get-timeslot', async (req, res) => {
  dataToSend = initializedModels.timeslot.findAll();
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

app.post('/api/update-lesson', async (req, res) => {
  try 
  {
    data = initializedModels.lesson.findAll
    (
      {
        where: {id : req.query.id} 
      }
    );
    data = await data;
    data = data[0]
  
    data.classroom = req.query.classroom
    data.timeslot = req.query.timeslot
    data.subject = req.query.subject
    data.staff = req.query.staff
    data.studentgroup = req.query.studentgroup
    data.classtype = req.query.classtype
    data.date = req.query.date
    data.semestr = req.query.semestr
    data.dayofweek = req.query.dayofweek
    data.typeofweek = req.query.typeofweek
    data.save()
  
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({ data: "200" });
  }
  catch
  {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json({ data: "500" });
  }
  
});

app.post('/api/delete-lessons', async (req, res) => {
  try 
  {
    let ids = qs.parse(req.query['ids']);
    let count = Object.keys(ids).length
    for(let i = 0; i < count; i++)
    {
      initializedModels.lesson.destroy(
      {
        where: {
          id: Number(ids[i])
        }
      })
    }
    res.json({ data: "200" })
  }
  catch(e)
  {
    res.json({ data: e })
  }});
 
//app.use((req, res, next) => {
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  next();
//});


/// Для групповых операций над занятиями 
/*
  subject
  staff
  group
  semestr
  dayInWeek
  OnceAWeek
  OnceInTwoWeeks
  OnceInFourWeeks
  IsDenominator
  beforeScheduleChanging
  afterScheduleChanging
*/


app.post('/api/create-lessons', async (req, res) => {
  const semestr = await initializedModels.semestr.findAll
  (
    {
      where: {id : req.query.semestr} 
    }
  );
  
  currDate = new Date(Date.parse(req.query.date))
  endDate = new Date(Date.parse(semestr[0].dataValues['enddate']))
  let beginDate = new Date(Date.parse(semestr[0].dataValues['startdate']))
  let changeSheduleDate =  new Date(Date.parse(semestr[0].dataValues['changescheduledate']))
  let lessonInstance = []
  let weektype = Math.round(weeksBetween(beginDate, currDate) / 2)

  while(currDate < endDate)
  {
    if(req.query.duration === '0' && currDate > changeSheduleDate) break;
    if(req.query.duration === '1' && currDate < changeSheduleDate){
      currDate.setDate(currDate.getDate() + 7)
       continue;
      }

    lessonInstance = initializedModels.lesson.build(
    {
      classroom: req.query.classroom,
      timeslot: req.query.timeslot,
      subject: req.query.subject,
      staff: req.query.staff,
      studentgroup: req.query.studentgroup,
      classtype: req.query.classtype,
      date : currDate,
      semestr: semestr[0].dataValues['id'].toString(),
      dayofweek : req.query.dayofweek,
      typeofweek : weektype,
      duration : req.query.duration,
      frequency : req.query.frequency
    });
    var resultOfSave = await lessonInstance.save()

    if(req.query.frequency === '0'){
      currDate.setDate(currDate.getDate() + 14)
    }
    else{
      currDate.setDate(currDate.getDate() + 28)
    }
  }

  dataToSend = initializedModels.lesson.findAll();
  dataToSend = await dataToSend;
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.json({ data: dataToSend });
});

function weeksBetween(d1, d2) 
{
  if (!d1 || !d2) return 0

  d1 = new Date(d1)
  d2 = new Date(d2)
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}


var cors = require('cors');
const classtype = require("./models/classtype");
const semestr = require("./models/semestr");
const lesson = require("./models/lesson");
const studentgroup = require("./models/studentgroup");
app.use(cors());
 


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});