import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

class StaticModal extends React.Component { 
  staff = []

  getStaff = async () => {
    this.staff = await axios.post('http://localhost:9090/api/get-staff')
    console.log(this.staff)
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

            <p>Выберите предмет</p>
            <Form.Select aria-label="Выберите предмет">
              <option> </option>
            </Form.Select>

            <p>Выберите преподавателя</p>
            
            <Form.Select aria-label="Выберите преподавателя">
            {this.staff.map(item => <option> {item.id} </option>)}
              
            </Form.Select>

            <p>Выберите пару</p>
            <Form.Select aria-label="Выберите пару">
              <option> </option>
            </Form.Select>

            <p>Выберите тип занятия</p>
            <Form.Select aria-label="Выберите тип занятия">
              <option> </option>
            </Form.Select>

            <p>Выберите аудиторию</p>
            <Form.Select aria-label="Выберите аудиторию">
              <option> </option>
            </Form.Select>



          </Modal.Body> 
          <Modal.Footer> 
            <Button variant="primary"> 
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