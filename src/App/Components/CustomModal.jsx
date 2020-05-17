// import React, { Component } from 'react'


import React, { Component } from 'react'
import {Button,Modal}  from 'react-bootstrap'



class CustomModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {

      console.log('in modal ',this.props.userData)
        return(
        <Modal
       {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Leave Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Following  are the details of the leave request selected</h4>
          <p>
            {this.props.reqData.employeecode}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=>{this.props.actionFunction(this.props.userData,this.props.reqData,this.props.action)}}>{this.props.action}</Button>
          <Button onClick={this.props.onHide}>CLOSE</Button>
        </Modal.Footer>
      </Modal>)
    }
}

export default CustomModal




// const Modal = ({ handleClose, show, children }) => {
   

//     return ( 
//     );
// };
// export default Modal;