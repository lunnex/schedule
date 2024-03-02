var DataTypes = require("sequelize").DataTypes;
var _classroom = require("./classroom");
var _classtype = require("./classtype");
var _degree = require("./degree");
var _department = require("./department");
var _housing = require("./housing");
var _jobtitle = require("./jobtitle");
var _lesson = require("./lesson");
var _staff = require("./staff");
var _studentgroup = require("./studentgroup");
var _subject = require("./subject");
var _timeslot = require("./timeslot");

function initModels(sequelize) {
  var classroom = _classroom(sequelize, DataTypes);
  var classtype = _classtype(sequelize, DataTypes);
  var degree = _degree(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var housing = _housing(sequelize, DataTypes);
  var jobtitle = _jobtitle(sequelize, DataTypes);
  var lesson = _lesson(sequelize, DataTypes);
  var staff = _staff(sequelize, DataTypes);
  var studentgroup = _studentgroup(sequelize, DataTypes);
  var subject = _subject(sequelize, DataTypes);
  var timeslot = _timeslot(sequelize, DataTypes);

  lesson.belongsTo(classroom, { as: "classroom_classroom", foreignKey: "classroom"});
  classroom.hasMany(lesson, { as: "lessons", foreignKey: "classroom"});
  lesson.belongsTo(classtype, { as: "classtype_classtype", foreignKey: "classtype"});
  classtype.hasMany(lesson, { as: "lessons", foreignKey: "classtype"});
  staff.belongsTo(degree, { as: "degree_degree", foreignKey: "degree"});
  degree.hasMany(staff, { as: "staffs", foreignKey: "degree"});
  staff.belongsTo(department, { as: "department_department", foreignKey: "department"});
  department.hasMany(staff, { as: "staffs", foreignKey: "department"});
  classroom.belongsTo(housing, { as: "housing", foreignKey: "housingid"});
  housing.hasMany(classroom, { as: "classrooms", foreignKey: "housingid"});
  staff.belongsTo(jobtitle, { as: "jobtitle_jobtitle", foreignKey: "jobtitle"});
  jobtitle.hasMany(staff, { as: "staffs", foreignKey: "jobtitle"});
  lesson.belongsTo(staff, { as: "staff_staff", foreignKey: "staff"});
  staff.hasMany(lesson, { as: "lessons", foreignKey: "staff"});
  lesson.belongsTo(studentgroup, { as: "studentgroup_studentgroup", foreignKey: "studentgroup"});
  studentgroup.hasMany(lesson, { as: "lessons", foreignKey: "studentgroup"});
  lesson.belongsTo(subject, { as: "subject_subject", foreignKey: "subject"});
  subject.hasMany(lesson, { as: "lessons", foreignKey: "subject"});
  lesson.belongsTo(timeslot, { as: "timeslot_timeslot", foreignKey: "timeslot"});
  timeslot.hasMany(lesson, { as: "lessons", foreignKey: "timeslot"});

  return {
    classroom,
    classtype,
    degree,
    department,
    housing,
    jobtitle,
    lesson,
    staff,
    studentgroup,
    subject,
    timeslot,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
