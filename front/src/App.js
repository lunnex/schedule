import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import Table from './components/table'


const App = () => {
  const [lessons, setData] = useState([]);

  const getLessons = async () => {
    let groupId = 1
    let typeofweek = [0, 1]
    let dayofweek = [0, 1, 2, 3, 4, 5]


    await axios.post('http://localhost:9090/api/get-lessons-by-group', null, { params: { groupId } })
      .then(response => {
        const allLessons = response.data.data;
        var grouped = []

        //taken from https://stackoverflow.com/questions/35506433/grouping-by-multiple-fields-per-object
        var groups = ['typeofweek', 'dayofweek']
        allLessons.forEach(function (a) {
          groups.reduce(function (o, g, i) {
            o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {});
            return o[a[g]];
          }, grouped).push(a);
        });

        setData(grouped)
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  const deleteLessons = async (ids) => {
    //console.log(ids)
    await axios.post('http://localhost:9090/api/delete-lessons', null, { params: { ids }, paramsSerializer: params => {
      return qs.stringify(params)} 
    })
    .then(response => {
      return(200)
    })
    .catch(error => {
      return(error)
    });
  }

  useEffect(() => {
    getLessons()
  }, [setData]);

  return (
    <div>
      {lessons.length > 0 && <Table data={lessons[0][1]} typeofweek = {0} dayofweek = {0} deleteLessons = {deleteLessons}/>}
    </div>
  );
}

export default App;
