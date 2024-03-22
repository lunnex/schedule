import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let groupId = 1
    axios.post('http://localhost:9090/api/get-lessons-by-group', null, {params:{groupId}})
      .then(response => {
        const allLessons = response.data.data;
        setData(allLessons)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [setData]);

  return (
    <div>
      <h1>Table Data</h1>
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
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.studentgroup_studentgroup.name}</td>
              <td>{item.timeslot_timeslot.number}  {item.timeslot_timeslot.starttime} - {item.timeslot_timeslot.endtime}</td>
              <td>{item.subject_subject.name}</td>
              <td>{item.staff_staff.fio}</td>
              <td>{item.classroom_classroom.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
