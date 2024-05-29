import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs'
import Table from './components/table'
import Modal from "./components/modal"
import Footer from "./components/footer"
import Header from "./components/header"


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
    //console.log(groupId)
    var grouped = []

    setLoading(true);
        
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
      console.log(lessons)
    } catch (err) {
      setError(err);

    } finally {
      setLoading(false);
    }
  }

  const getGroups = async () => {
    setLoading(true);
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
    //setLoading(true)
    setLoading(true)
    setGroupId(e.target.value);
    getLessons(selectedGroupId);
    setLoading(false)

  };

  useEffect(() => {
    getLessons(selectedGroupId);
    getGroups();

  }, [selectedGroupId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <Header/>

    <label htmlFor="group-select">Группа: </label>
      <select id="group-select" onChange={handleGroupChange} value={selectedGroupId}>
      {groups.map((group) => (
          <option key={group.id} value={group.id}>{group.name}</option>))
      }
      </select>


    <table>
      <h1>Числитель</h1>
      <tr>
        <td>
          {lessons.length > 0 && lessons[0] && lessons[0][1] && 
          <Table data={lessons[0][1]} typeofweek = {0} dayofweek = {1}
          deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
          setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[0] && lessons[0][2] && 
            <Table data={lessons[0][2]} typeofweek = {0} dayofweek = {2}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[0] && lessons[0][3] && 
            <Table data={lessons[0][3]} typeofweek = {0} dayofweek = {3}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>
        </tr>

        <tr>

        <td>
          {lessons.length > 0 && lessons[0] && lessons[0][4] && 
            <Table data={lessons[0][4]} typeofweek = {0} dayofweek = {4}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[0] && lessons[0][5] && 
            <Table data={lessons[0][5]} typeofweek = {0} dayofweek = {5}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[0] && lessons[0][6] && 
            <Table data={lessons[0][6]} typeofweek = {0} dayofweek = {6}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>
      </tr>

      <h1>Знаменатель</h1>
      <tr>
        <td>
          {lessons.length > 0 && lessons[1] && lessons[1][1] && 
          <Table data={lessons[1][1]} typeofweek = {1} dayofweek = {1}
          deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
          setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[1] && lessons[1][2] && 
            <Table data={lessons[1][2]} typeofweek = {1} dayofweek = {2}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[1] && lessons[1][3] && 
            <Table data={lessons[1][3]} typeofweek = {1} dayofweek = {3}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>
        </tr>

        <tr>

        <td>
          {lessons.length > 0 && lessons[1] && lessons[1][4] && 
            <Table data={lessons[1][4]} typeofweek = {1} dayofweek = {4}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[1] && lessons[1][5] && 
            <Table data={lessons[1][5]} typeofweek = {1} dayofweek = {5}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>

        <td>
          {lessons.length > 0 && lessons[1] && lessons[1][6] && 
            <Table data={lessons[1][6]} typeofweek = {1} dayofweek = {6}
            deleteLessons = {deleteLessons} openModal = {openModal} closeModal = {closeModal} 
            setCurrentLessonState = {setCurrentLessonState}/> 
          }
        </td>
      </tr>
      

      <button onClick={openModal}>Добавить</button>

      {modal && <Modal typeofweek = {0} studentgroup={selectedGroupId} 
        semestr={1} closeModal = {closeModal} currentLesson = {currentLesson} deleteLessons = {deleteLessons}></Modal>
      }
    </table>
<Footer/>
</div>
  );
}

export default App;
