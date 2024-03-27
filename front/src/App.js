import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import Table from './components/table'
import Modal from "./components/modal";


const App = () => {
  const [lessons, setData] = useState([]);
  const [staff, setStaff] = useState([]);
  const [subject, setSubject] = useState([]);
  const [timeslot, setTimeslot] = useState([]);
  const [classtype, setClasstype] = useState([]);
  const [classroom, setClassroom] = useState([]);
  const [modal, setModalState] = useState(false);


  const getLessons = async () => {
    let groupId = 1
    let semestr = 1

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

  const getStaff = async () => {
    await axios.post('http://localhost:9090/api/get-staff')
    .then(response => {
      const staff = response.data.data
      setStaff(staff)
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }

  const getSubject = async () => {
    await axios.post('http://localhost:9090/api/get-subject')
    .then(response => {
      const subject = response.data.data
      setSubject(subject)
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }

  const getTimeslot = async () => {
    await axios.post('http://localhost:9090/api/get-timeslot')
    .then(response => {
      const timeslot = response.data.data
      setTimeslot(timeslot)
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }

  const getClassType = async () => {
    await axios.post('http://localhost:9090/api/get-classtype')
    .then(response => {
      const classType = response.data.data
      setClasstype(classType)
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }

  const getClassroom = async () => {
    this.classroom = await (await axios.post('http://localhost:9090/api/get-classroom'))
    .then(response =>{
      const classroom = response.data.data
      setClassroom(classroom)
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

  function handleNew() {
    setModalState(true);
  }

  useEffect(() => {
    getLessons()
  }, [setData]);


  return (
    <div>
      {lessons.length > 0 && <Table data={lessons[0][1]} typeofweek = {0} dayofweek = {0} deleteLessons = {deleteLessons}/>}
      <button onClick={handleNew}></button>
      {modal && <Modal typeofweek = {0} studentgroup={1} semestr={1}></Modal>}
    </div>
  );
}

export default App;
