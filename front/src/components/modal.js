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
    this.handleClose = this.handleClose.bind(this)
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

  handleClose(){
    //console.log(this.props.currentLesson)
    this.props.closeModal();
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

  async componentDidMount()
  {
    await this.getStaff()
    await this.getSubject()
    await this.getTimeslot()
    await this.getClassType()
    await this.getClassroom()
    this.forceUpdate()
  }

  //taken from https://stackoverflow.com/questions/22859704/number-of-weeks-between-two-dates-using-javascript
  weeksBetween(d1, d2) 
  {
    d1 = new Date(d1)
    d2 = new Date(d2)
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
  }

  getMaxDate(dates)
  {
    dates = dates.map(item => new Date(item))
    return new Date(Math.max.apply(null,dates));
  }

  getMinDate(dates)
  {
    dates = dates.map(item => new Date(item))
    return new Date(Math.min.apply(null,dates));
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

          <Form> 
            <p>Выберите предмет</p>
            <Form.Select aria-label="Выберите предмет" name="subject" onChange={e => this.updateInput(e, 'subject')}>
            <option selected = {this.props.currentLesson == null}></option>
            {this.subject.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.subject : false}>{item.name}</option>)
            }
            </Form.Select>

            <p>Выберите преподавателя</p>
            <Form.Select aria-label="Выберите преподавателя" name="staff" onChange={e => this.updateInput(e, 'staff')}>
            <option selected = {this.props.currentLesson == null}></option>
            {this.staff.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.staff : false}>{item.fio}</option>)
            }
            </Form.Select>

            <p>Выберите пару</p>
            <Form.Select aria-label="Выберите пару" name="timeslot" onChange={e => this.updateInput(e, 'timeslot')}>
            <option selected = {this.props.currentLesson == null}></option>
            {this.timeslot.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.timeslot : false}>{item.number}</option>)
            }
            </Form.Select>

            <p>Выберите тип занятия</p>
            <Form.Select aria-label="Выберите тип занятия" name="classtype" onChange={e => this.updateInput(e, 'classtype')}>
            <option selected = {this.props.currentLesson == null}></option>
            {this.classtype.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.classtype : false}>{item.name}</option>)
            }
            </Form.Select>

            <p>Выберите аудиторию</p>
            <Form.Select aria-label="Выберите аудиторию" name="classroom" onChange={e => this.updateInput(e, 'classroom')}>
            <option selected = {this.props.currentLesson == null}></option>
            {this.classroom.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.classroom : false}>{item.name}</option>)
            }
            </Form.Select>
            
            <p>Дата первого занятия в семестре</p>
            <input type="date" name="firstdate"  
            value = {this.props.currentLesson != null ? this.props.currentLesson.dates[this.props.currentLesson.dates.length - 1] : new Date()} onChange={e => this.updateInput(e, 'date')}/>

            <p>Каждый числитель/знаменатель</p>
            <input type="radio" name="frequency" value = "0" 
            
            checked = {this.props.currentLesson != null && (this.weeksBetween(new Date(this.props.currentLesson.semestr_semestr.startdate), new Date(this.props.currentLesson.semestr_semestr.enddate)) / 2 - 1
                      < this.weeksBetween(this.getMinDate(this.props.currentLesson.dates), this.getMaxDate(this.props.currentLesson.dates)))} 
            onChange={e => this.updateInput(e, 'frequency')}/>

            <p>Через один числитель/знаменатель</p>
            <input type="radio" name="frequency" value = "1" 
            
            checked = {this.props.currentLesson != null && (this.weeksBetween(new Date(this.props.currentLesson.semestr_semestr.startdate), new Date(this.props.currentLesson.semestr_semestr.enddate)) / 2 - 1
            >= this.weeksBetween(this.getMinDate(this.props.currentLesson.dates), this.getMaxDate(this.props.currentLesson.dates)))} 
            onChange={e => this.updateInput(e, 'frequency')}/>

            <p>До смены расписания</p>
            <input type="radio" name="duration" value = "0" checked = {this.props.currentLesson != null && this.getMaxDate(this.props.currentLesson.dates) < new Date(this.props.currentLesson.semestr_semestr.changescheduledate) } 
            onChange={e => this.updateInput(e, 'duration')}/>

            <p>После смены расписания</p>
            <input type="radio" name="duration" value = "1" checked = {this.props.currentLesson != null && this.getMinDate(this.props.currentLesson.dates) > new Date(this.props.currentLesson.semestr_semestr.changescheduledate) } 
            onChange={e => this.updateInput(e, 'duration')}/>

            <p>До и после смены расписания</p>
            <input type="radio" name="duration" value = "2" 
            
            checked = {this.props.currentLesson != null && this.getMinDate(this.props.currentLesson.dates) < new Date(this.props.currentLesson.semestr_semestr.changescheduledate) &&
                      this.getMaxDate(this.props.currentLesson.dates) > new Date(this.props.currentLesson.semestr_semestr.changescheduledate)} 
            onChange={e => this.updateInput(e, 'duration')}/>

          </Form>
          </Modal.Body> 
          <Modal.Footer> 
            <Button variant="primary" onClick={this.handleSubmit}> 
            Save changes 
            </Button> 
            <Button variant="secondary"onClick={this.handleClose}> 
            Close 
            </Button> 
          </Modal.Footer> 
        </Modal.Dialog> 
      </div> 
    ); 
  }
}

export default StaticModal;