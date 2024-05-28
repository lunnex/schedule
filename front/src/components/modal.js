import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import qs from 'qs'


class StaticModal extends React.Component { 

  constructor(props) {
    super(props);

    if(props.currentLesson !== null){
      this.state = {
        currentStaff : props.currentLesson.staff,
        currentSubject : props.currentLesson.subject,
        currentTimeslot : props.currentLesson.timeslot,
        currentClasstype : props.currentLesson.classtype,
        currentClassroom : props.currentLesson.classroom,
        typeofweek : '',
        date : props.currentLesson.date,
        frequency: props.currentLesson.frequency,
        duration: props.currentLesson.duration,
      }
    }
    else{
      this.state = {
        currentStaff : '',
        currentSubject : '',
        currentTimeslot : '',
        currentClasstype : '',
        currentClassroom : '',
        typeofweek : '',
        date : '',
        frequency: '',
        duration: '',
      }
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this)
  }

  async updateSubject(event){
    console.log(this.props.currentLesson)
    await this.setState({currentSubject : event.target.value})
    console.log(this.state)
  }

  async updateStaff(event){
    await this.setState({currentStaff : event.target.value})
    console.log(this.state)
  }

  async updateTimeslot(event){
    await this.setState({currentTimeslot : event.target.value})
    console.log(this.state)
  }

  async updateClasstype(event){
    await this.setState({currentClasstype : event.target.value})
    console.log(this.state)
  }

  async updateClassroom(event){
    await this.setState({currentClassroom : event.target.value})
    console.log(this.state)
  }

  async updateDate(event){
    await this.setState({date: event.target.value})
    console.log(this.state)
  }

  async updateFrequency(event){
    await this.setState({frequency: event.target.value})
    console.log(this.state)
  }

  async updateDuration(event){
    await this.setState({duration: event.target.value})
    console.log(this.state)
  }

  //async handleSubmit(){
  //  await this.getSemestr();
  //}
    
  async handleSubmit(){
    if(this.props.currentLesson !== null){
      console.log(this.props.currentLesson.ids)
      this.props.deleteLessons(this.props.currentLesson.ids)
    }

    var OnceInTwoWeeks = false
    if(this.state.frequency === '0' && this.state.frequency !== undefined)
      OnceInTwoWeeks = true

    var beforeScheduleChanging = false
    var afterScheduleChanging = false
    if(this.state.duration === '0')
      beforeScheduleChanging = true
    if(this.state.duration === '1')
      afterScheduleChanging = true

    await this.getSemestr();

    let staff = this.state.currentStaff
    let subject = this.state.currentSubject
    let timeslot = this.state.currentTimeslot
    let classtype = this.state.currentClasstype
    let classroom = this.state.currentClassroom
    let date = this.state.date 
    let typeofweek = this.typeofweek ?? 0
    let dayofweek = (new Date(this.state.date)).getDay().toString()
    let studentgroup = this.props.studentgroup
    let semestr = this.props.semestr
    let frequency = this.state.frequency

    axios.post('http://localhost:9090/api/create-lessons', null, { 
      params: { staff, subject, timeslot, classtype, classroom, date, typeofweek, dayofweek, OnceInTwoWeeks, beforeScheduleChanging, afterScheduleChanging, studentgroup, semestr, frequency } 
    })
    .then(response => {
      return(200)
    })
    .catch(error => {
      return(error)
    });

    this.forceUpdate();

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
  semestr = []
  typeofweek = ''

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

  getSemestr = async () => {
    let propSemestr = this.props.semestr
    this.semestr = await (await axios.post('http://localhost:9090/api/get-semestr', null, {params: {id: propSemestr}})).data.data[0]
    console.log(this.semestr)
    this.typeofweek = this.weeksBetween(this.semestr.startdate, this.state.date) % 2
    console.log(this.typeofweek)
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
    if (!d1 || !d2) return 0

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
            <Form.Select aria-label="Выберите предмет" name="subject" onChange={e => this.updateSubject(e)}>
            {this.subject.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.subject : false}>{item.name}</option>)
            }
            <option selected = {this.props.currentLesson == null}></option>
            </Form.Select>

            <p>Выберите преподавателя</p>
            <Form.Select aria-label="Выберите преподавателя" name="staff" onChange={e => this.updateStaff(e)}>
            {this.staff.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.staff : false}>{item.fio}</option>)
            }
            <option selected = {this.props.currentLesson == null}></option>
            </Form.Select>

            <p>Выберите пару</p>
            <Form.Select aria-label="Выберите пару" name="timeslot" onChange={e => this.updateTimeslot(e)}>
            {this.timeslot.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.timeslot : false}>{item.number}</option>)
            }
            <option selected = {this.props.currentLesson == null}></option>
            </Form.Select>

            <p>Выберите тип занятия</p>
            <Form.Select aria-label="Выберите тип занятия" name="classtype" onChange={e => this.updateClasstype(e)}>
            {this.classtype.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.classtype : false}>{item.name}</option>)
            }
            <option selected = {this.props.currentLesson == null}></option>
            </Form.Select>

            <p>Выберите аудиторию</p>
            <Form.Select aria-label="Выберите аудиторию" name="classroom" onChange={e => this.updateClassroom(e)}>
            {this.classroom.map(item => 
            <option value={item.id} selected = {this.props.currentLesson != null ? item.id === this.props.currentLesson.classroom : false}>{item.name}</option>)
            }
            <option selected = {this.props.currentLesson == null}></option>
            </Form.Select>
            
            <p>Дата первого занятия в семестре</p>
            <input type="date" name="firstdate"  
            onChange={e => this.updateDate(e)}/>

            <p>Каждый числитель/знаменатель</p>
            <input type="radio" name="frequency" value = "0" 
            onChange={e => this.updateFrequency(e)}/>

            <p>Через один числитель/знаменатель</p>
            <input type="radio" name="frequency" value = "1" 
            onChange={e => this.updateFrequency(e)}/>

            <p>До смены расписания</p>
            <input type="radio" name="duration" value = "0"
            onChange={e => this.updateDuration(e)}/>

            <p>После смены расписания</p>
            <input type="radio" name="duration" value = "1"
            onChange={e => this.updateDuration(e)}/>

            <p>До и после смены расписания</p>
            <input type="radio" name="duration" value = "2" 
            onChange={e => this.updateDuration(e)}/>

          </Form>
          </Modal.Body> 
          <Modal.Footer> 
            <Button variant="primary" onClick={this.handleSubmit}> 
            Сохранить
            </Button> 
            <Button variant="secondary"onClick={this.handleClose}> 
            Закрыть
            </Button> 
          </Modal.Footer> 
        </Modal.Dialog> 
      </div> 
    ); 
  }
}

export default StaticModal;