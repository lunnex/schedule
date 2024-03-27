import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import qs from 'qs'


class StaticModal extends React.Component { 

  constructor(props) {
    super(props);
    this.state = {
      currentStaff : '',
      currentSubject : '',
      currentTimeslot : '',
      currentClasstype : '',
      currentClassroom : '',
      date : '',
      frequency: '',
      duration: '',

    }
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateInput(event, tochange){
    console.log(tochange)
    switch(tochange){
      case 'subject':
        this.setState({currentSubject : event.target.value})
      case 'staff':
        this.setState({currentStaff : event.target.value})
      case 'timeslot':
        this.setState({currentTimeslot : event.target.value})
      case 'classtype':
        this.setState({currentClasstype : event.target.value})
      case 'classroom':
        this.setState({currentClassroom : event.target.value})
      case 'date':
        this.setState({date : event.target.value})
      case 'frequency':
        this.setState({frequency : event.target.value})
      case 'duration':
        this.setState({duration : event.target.value})
    }

  }
    
  handleSubmit(){
    console.log(this.state.duration)
    var OnceInTwoWeeks = false
    if(this.state.frequency === '0')
      OnceInTwoWeeks = true

    var beforeScheduleChanging = false
    var afterScheduleChanging = false
    if(this.state.duration === '0')
      beforeScheduleChanging = true
    if(this.state.duration === '1')
      afterScheduleChanging = true

    let staff = this.state.currentStaff
    let subject = this.state.currentSubject
    let timeslot = this.state.currentTimeslot
    let classtype = this.state.currentClasstype
    let classroom = this.state.currentClassroom
    let date = this.state.date 
    let typeofweek = this.props.typeofweek
    let dayofweek = (new Date(this.state.date)).getDay()
    let studentgroup = this.props.studentgroup
    let semestr = this.props.semestr

    console.log(staff, subject, timeslot, classtype, classroom, date, typeofweek, dayofweek, OnceInTwoWeeks, beforeScheduleChanging, afterScheduleChanging)
    axios.post('http://localhost:9090/api/create-lessons', null, { 
      params: { staff, subject, timeslot, classtype, classroom, date, typeofweek, dayofweek, OnceInTwoWeeks, beforeScheduleChanging, afterScheduleChanging, studentgroup, semestr } 
    })
    .then(response => {
      return(200)
    })
    .catch(error => {
      return(error)
    });
  }



  staff = []
  subject = []
  timeslot = []
  classtype = []
  classroom = []

  state = {
    currentStaff : ''
  }


  currentSubject = ''
  currentTimeslot = ''
  currentClasstype = ''
  currentClassroom = ''


  getStaff = async () => {
    this.staff = await (await axios.post('http://localhost:9090/api/get-staff')).data.data
  }

  getSubject = async () => {
    this.subject = await (await axios.post('http://localhost:9090/api/get-subject')).data.data
  }

  getTimeslot = async () => {
    this.timeslot = await (await axios.post('http://localhost:9090/api/get-timeslot')).data.data
  }

  getClassType = async () => {
    this.classtype = await (await axios.post('http://localhost:9090/api/get-classtype')).data.data
  }

  getClassroom = async () => {
    this.classroom = await (await axios.post('http://localhost:9090/api/get-classroom')).data.data
  }

  addLessons = async (ids) => {
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

  onFormSubmit(){

    //console.log(staff, subject, timeslot, classtype, classroom, date, typeofweek, dayofweek)

    //axios.post('http://localhost:9090/api/delete-lessons', null, { 
    //  params: { this.state }, paramsSerializer: params => {
    //  return qs.stringify(params)} 
    //})
    //.then(response => {
    //  return(200)
    //})
    //.catch(error => {
    ///  return(error)
    //});
  }



  async componentDidMount()
  {
    await this.getStaff()
    await this.getSubject()
    await this.getTimeslot()
    await this.getClassType()
    await this.getClassroom()
    this.forceUpdate()
  }

  render(){
    return ( 
      <div style={{ display: 'block', 
                    position:'absolute',
                    width: 700,  
                    padding: 30,
                    backgroundColor:'white' }}> 
        <Modal.Dialog> 
          <Modal.Header closeButton> 
            <Modal.Title> 
            Форма добавления новых занятий
            </Modal.Title> 
          </Modal.Header> 
          <Modal.Body> 

          <Form onSubmit={this.onFormSubmit()}> 
            <p>Выберите предмет</p>
            <Form.Select aria-label="Выберите предмет" name="subject" onChange={e => this.updateInput(e, 'subject')}>
            <option></option>
            {this.subject.map(item => 
            <option value={item.id}>{item.name}</option>)
            }
            </Form.Select>

            <p>Выберите преподавателя</p>
            <Form.Select aria-label="Выберите преподавателя" name="staff" onChange={e => this.updateInput(e, 'staff')}>
            <option></option>
            {this.staff.map(item => 
            <option value={item.id}>{item.fio}</option>)
            }
            </Form.Select>

            <p>Выберите пару</p>
            <Form.Select aria-label="Выберите пару" name="timeslot" onChange={e => this.updateInput(e, 'timeslot')}>
            <option></option>
            {this.timeslot.map(item => 
            <option value={item.id}>{item.number}</option>)
            }
            </Form.Select>

            <p>Выберите тип занятия</p>
            <Form.Select aria-label="Выберите тип занятия" name="classtype" onChange={e => this.updateInput(e, 'classtype')}>
            <option></option>
            {this.classtype.map(item => 
            <option value={item.id}>{item.name}</option>)
            }
            </Form.Select>

            <p>Выберите аудиторию</p>
            <Form.Select aria-label="Выберите аудиторию" name="classroom" onChange={e => this.updateInput(e, 'classroom')}>
            <option></option>
            {this.classroom.map(item => 
            <option value={item.id}>{item.name}</option>)
            }
            </Form.Select>
            
            <p>Дата первого занятия в семестре</p>
            <input type="date" name="firstdate" onChange={e => this.updateInput(e, 'date')}/>

            <p>Каждый числитель/знаменатель</p>
            <input type="radio" name="frequency" value = "0" onChange={e => this.updateInput(e, 'frequency')}/>

            <p>Через один числитель/знаменатель</p>
            <input type="radio" name="frequency" value = "1"  onChange={e => this.updateInput(e, 'frequency')}/>

            <p>До смены расписания</p>
            <input type="radio" name="duration" value = "0" onChange={e => this.updateInput(e, 'duration')}/>

            <p>После смены расписания</p>
            <input type="radio" name="duration" value = "1" onChange={e => this.updateInput(e, 'duration')}/>

            <p>До и после смены расписания</p>
            <input type="radio" name="duration" value = "2" onChange={e => this.updateInput(e, 'duration')}/>

          </Form>
          </Modal.Body> 
          <Modal.Footer> 
            <Button variant="primary" onClick={this.handleSubmit}> 
            Save changes 
            </Button> 
            <Button variant="secondary"> 
            Close 
            </Button> 
          </Modal.Footer> 
        </Modal.Dialog> 
      </div> 
    ); 
  }
}

export default StaticModal;