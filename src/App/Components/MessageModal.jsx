// import React, { Component } from 'react'


import React, { Component } from 'react'
import {Button,Modal,Table}  from 'react-bootstrap'



class MessageModal extends Component {
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
           <p>  {this.props.message}</p>
        </Modal.Body>
        <Modal.Footer>
       
          <Button onClick={this.props.onHide}>CLOSE</Button>
        </Modal.Footer>
      </Modal>)
    }
}

export default MessageModal




// const Modal = ({ handleClose, show, children }) => {
   

//     return ( 
//     );
// };
// export default Modal;
