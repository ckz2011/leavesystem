// import React, { Component } from 'react'


import React, { Component } from 'react'
import {Button,Modal,Table}  from 'react-bootstrap'



class CustomModal extends Component {
    constructor(props) {
        super(props)

      
    }

  
    render() {
      console.log("in modal revremarks ",this.props.revRemarks)
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
          <Table striped bordered hover size="sm">
 
  
 
  <tbody>
  <tr>
      <td>Employeecode</td>
      <td>{this.props.reqData.employeecode}</td>
    
    </tr>
  <tr>
      <td>Employeename</td>
      <td>{this.props.reqData.employeename}</td>
    
    </tr>
    <tr>
      <td>Period of leave </td>
      <td>{this.props.reqData.startDate} &nbsp;{this.props.reqData.fromleavetype}to {this.props.reqData.endDate} &nbsp; {this.props.reqData.toleavetype }</td>
    
    </tr>
    <tr>
      <td>No of Leaves</td>
      <td>{this.props.reqData.noofleaves}&nbsp;{this.props.reqData.halfdaytime}</td>
    
    </tr>
    
    <tr>
      <td>Details</td>
      <td>{this.props.reqData.purpose}<br/>
      {   this.props.reqData.latereason}
      </td>
    </tr>
    <tr>
      <td>Address and Contact Reason</td>
      <td>{this.props.reqData.address}<br/>
      {   this.props.reqData.leavephoneno}
      </td>
    </tr>
    <tr>
      <td  style={{ display: this.props.showRevert }} >Remarks on Reverting</td>
      <td><input type="text" name="revremarks"  style={{ display: this.props.showRevert }} onChange={(e)=>{this.props.revertFunction(e)}} width="100"  placeholder="Enter Remarks"/>
      
      </td>
    </tr>
  </tbody>
</Table>
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={()=>{this.props.actionFunction(this.props.userData,this.props.reqData,this.props.action,this.props.revRemarks)}}>{this.props.action}</Button>
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