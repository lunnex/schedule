import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import Table from './components/table'
import Modal from "./components/modal";


const App = () => {
  const [lessons, setData] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModalState] = useState(false);
  const [currentLesson, setCurrentLessonState] = useState(null);
  const [selectedGroupId, setGroupId] = useState(1);

  const getLessons = async (id) => {
    let groupId = id
    let semestr = 1
    //console.log('aaaaa')
    var grouped = []
        
    try {
      const response = await axios.post('http://localhost:9090/api/get-lessons-by-group', null, { params: { groupId } })
      const allLessons = response.data.data;
      //taken from https://stackoverflow.com/questions/35506433/grouping-by-multiple-fields-per-object
      var groups = ['typeofweek', 'dayofweek']
      allLessons.forEach(function (a) {
        groups.reduce(function (o, g, i) {
          o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {});
          return o[a[g]];
        }, grouped).push(a);
      });

      setData(grouped)
      console.log(grouped)
    } catch (err) {
      setError(err);

    } finally {
      setLoading(false);
    }
  }

  const getGroups = async () => {
    try {
      const response = await axios.post('http://localhost:9090/api/get-studentgroup')
      setGroups(response.data.data)
    } catch (err) {
      setError(err);

    } finally {
      setLoading(false);
    }
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

  const openModal = () => {
    console.log('open')
    setModalState(true);
  }

  const closeModal = () => {
    console.log('closed')
    setModalState(false);
  }

  const handleGroupChange = (e) => {
    setGroupId(e.target.value);
  };

  useEffect(() => {
    getGroups();
    getLessons(selectedGroupId);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <label htmlFor="group-select">Группа: </label>
      <select id="group-select" onChange={handleGroupChange} value={selectedGroupId}>
      {groups.map((group) => (
          <option key={group.id} value={group.id}>{group.value}</option>))
      }
      </select>

    <table>
      <tr>
        <td>
          {lessons && 
          <Table data={lessons[0][1]} typeofweek = {0} dayofweek = {1}
          deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
          setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons && 
            <Table data={lessons[0][2]} typeofweek = {0} dayofweek = {2}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons && 
            <Table data={lessons[0][3]} typeofweek = {0} dayofweek = {3}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons && 
            <Table data={lessons[0][4]} typeofweek = {0} dayofweek = {4}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons && 
            <Table data={lessons[0][5]} typeofweek = {0} dayofweek = {5}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons && 
            <Table data={lessons[0][6]} typeofweek = {0} dayofweek = {6}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

      </tr>
      

      <button onClick={openModal}>Добавить</button>

      {modal && <Modal typeofweek = {0} studentgroup={1} 
        semestr={1} closeModal = {closeModal} currentLesson = {currentLesson} deleteLessons = {deleteLessons}></Modal>
      }
    </table>
</div>
  );
}

export default App;
