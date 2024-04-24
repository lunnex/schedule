import React from "react";
import Modal from "./modal";

class Table extends React.Component {
    constructor(props) {
      super(props);
    }

    distinctObjects(arr) {
      const uniqueObjects = [];
      const ids = [];
      const dates = [];
  
      arr.forEach((obj, index) => {
        obj['ids'] = []
        obj['dates'] = []
          const isDuplicate = uniqueObjects.some(item => item.classroom === obj.classroom &&
                                                          item.semestr === obj.semestr &&
                                                          item.staff === obj.staff &&
                                                          item.studentgroup === obj.studentgroup &&
                                                          item.subject === obj.subject &&
                                                          item.timeslot === obj.timeslot);

          const sameObject = uniqueObjects.find(item => item.classroom === obj.classroom &&
                                                            item.semestr === obj.semestr &&
                                                            item.staff === obj.staff &&
                                                            item.studentgroup === obj.studentgroup &&
                                                            item.subject === obj.subject &&
                                                            item.timeslot === obj.timeslot);
          if (!isDuplicate) {
            uniqueObjects.push(obj);
            obj['ids'].push(obj.id)
            obj['dates'].push(obj.date)
          } else {
            sameObject['ids'].push(obj.id);
            sameObject['dates'].push(obj.date)
          }
      });
      
      //console.log(uniqueObjects)
      return { uniqueObjects, ids, dates };
    }

    dayOfWeekCondition(dayNum) {
      switch(dayNum) {
        case 1:
          return 'Понедельник';
        case 2:
          return 'Вторник';
        case 3:
          return 'Среда';
        case 4:
          return 'Четверг';
        case 5:
          return 'Пятница';
        case 6:
          return 'Суббота';
        default:
          return 'foo';
      }
    }

    compare( a, b ) {
      if ( a.timeslot < b.timeslot ){
        return -1;
      }
      if ( a.timeslot > b.timeslot ){
        return 1;
      }
      return 0;
    }

    deleteLessons(){

    }

    beginChanging(item){
      this.props.setCurrentLessonState(item)
      console.log('beginChanging')
      this.props.openModal()
    }

    render() {
        return(         
        <div>         
          <h1>{this.dayOfWeekCondition(this.props.dayofweek)}</h1>
        <table>
            <thead>
              <th>Пара</th>
              <th>Время</th>
              <th>Занятие</th>
              <th>Действие</th>
            </thead>
            <tbody>
              {this.distinctObjects(this.props.data)['uniqueObjects'].sort(this.compare).map(item => (
                <tr key={item.id}>
                  <td>{item.timeslot_timeslot.id}</td>
                  <td>{item.timeslot_timeslot.starttime} - {item.timeslot_timeslot.endtime}</td>
                  <p>{item.subject_subject.name}</p>
                  <p>{item.staff_staff.fio}</p>
                  <p>{item.classroom_classroom.name}</p>
                  <p>{item.dates.map(i => {return i + '; '})}</p>
                  <td>
                    <button onClick={() => this.props.deleteLessons(item.ids)}>
                        Удалить
                    </button>
                    {<button onClick={this.beginChanging.bind(this, item)}>
                        Изменить
                    </button>
                  }
                  </td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>)
    }
  }

export default Table