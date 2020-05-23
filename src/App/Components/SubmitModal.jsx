// import React, { Component } from 'react'


import React, { Component } from 'react'
import {Button,Modal}  from 'react-bootstrap'



class SubmitModal extends Component {
    constructor(props) {
        super(props)

      
    }

  
    render() {
     
        return(
        <Modal
       {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
         
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <h3> Do you want to sumit your leave application ?</h3>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={this.props.onConfirm}>SUBMIT</Button>
          <Button onClick={this.props.onHide}>CLOSE</Button>
        </Modal.Footer>
      </Modal>)
    }
}

export default SubmitModal




// const Modal = ({ handleClose, show, children }) => {
   

//     return ( 
//     );
// };
// export default Modal;
