import React, { useState, useEffect } from 'react';
import axios from 'axios';


const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9090/api/lessons')
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
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.classroom}</td>
              <td>{item.timeslot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
