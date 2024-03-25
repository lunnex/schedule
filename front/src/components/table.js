import React from "react";

class Table extends React.Component {
    constructor(props) {
      super(props);
    }

    dayOfWeekCondition(dayNum) {
      switch(dayNum) {
        case 0:
          return 'Понедельник';
        case 1:
          return 'Вторник';
        case 2:
          return 'Среда';
        case 3:
          return 'Четверг';
        case 4:
          return 'Пятница';
        case 5:
          return 'Суббота';
        default:
          return 'foo';
      }
    }
  
    render() {
        return(
        <div>
        <h1>{this.dayOfWeekCondition(this.props.dayofweek)}</h1>
        <table>
          <thead>
            <tr>
              <th>Группа</th>
              <th>Пара</th>
              <th>Предмет</th>
              <th>Преподаватель</th>
              <th>Аудитория</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(item => (
              <tr key={item.id}>
                <td>{item.studentgroup_studentgroup.name}</td>
                <td>{item.timeslot_timeslot.number}  {item.timeslot_timeslot.starttime} - {item.timeslot_timeslot.endtime}</td>
                <td>{item.subject_subject.name}</td>
                <td>{item.staff_staff.fio}</td>
                <td>{item.classroom_classroom.name}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
    }
  }

export default Table