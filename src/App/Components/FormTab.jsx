import React, { Component } from 'react'
import { Form, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Constants from '../Config/core';
import axios from 'axios';
import MessageModal from './MessageModal'
import ReactDOM from 'react-dom'


import "react-datepicker/dist/react-datepicker.css";

class FormTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startDate: '',
      endDate: '',
      halfdayfrom: 'false',
      halfdaytime: '',
      halfdayto: 'false',
      address: '',
      purpose: '',
      postapprovalval: '',
      checkboxdisplay: 'none',
      radiodisplayreq: false,
      postapproval: 'none',
      postaprrovalreq: false,
      outstationperm: 'false',
      radiodisplay: 'none',
      leavephoneno: '',
      employeecode: 'MH00682',
      lvyear: '',
      messageShow: false,
      message: "",
      check: "",
    

    }
  }
  componentDidMount() {
    console.log("ddd")
  }
  showMessageModal = (message) => {

    this.setState({
      messageShow: true,
      message: message

    });
  };
  hideMessageModal = () => {
    this.setState({ messageShow: false });
  };
  resetForm = () => {
    const stateFormFields = ["startDate", "endDate", "halfdayfrom",
      "halfdaytime", "halfdayto", "address", "purpose",
      "postapprovalval",
      "postapproval", , "outstationperm",
      "leavephoneno",
      "lvyear", "messageShow", "message"]
    stateFormFields.map(e => this.setState({ e: "" }))
  }


  handleStartDateChange = date => {
    let postapprovalstatus = 'none'
    let postapprovalreqstatus = false

    
    if (date === ''|| date==null) {
     
      return
    }
    if (date > new Date()) {
      postapprovalstatus = 'none'
      postapprovalreqstatus = false
    }
    else {
      postapprovalstatus = 'block'
      postapprovalreqstatus = true
    }




    let checkboxshowsetting = 'none'
    let radiodisplaysetting = 'none'
    let radiodisplayreqsetting = false
    if ((this.state.endDate) !== '') {


      if ((this.state.endDate).getTime() === date.getTime()) {
        checkboxshowsetting = 'none'

        if (this.state.halfdayfrom === 'true') {

          radiodisplaysetting = 'block'
        }
        else {
          radiodisplaysetting = 'none'
        }

      }
      else {
        checkboxshowsetting = 'block'
        radiodisplaysetting = 'none'


      }
    }
    radiodisplayreqsetting = (radiodisplaysetting === 'block') ? true : false
    this.setState({
      startDate: date,
      checkboxdisplay: checkboxshowsetting,
      radiodisplay: radiodisplaysetting,
      postapproval: postapprovalstatus,
      postapprovalreq: postapprovalreqstatus,
      radiodisplayreq: radiodisplayreqsetting,
      lvyear: date.getFullYear()

    });
  };


  fromHandleHalfday = (event) => {
    let halfdayfromsetting = 'false'
    let radiodisplaysetting = 'none'
    let checkboxshowsetting = 'none'
    let radiodisplayreqsetting = false
    if ((this.state.startDate === '') || (this.state.endDate === '')) {
      this.setState({
        messageShow: true,
          message: 'Please select Start Date and End Date'
  
        });
        halfdayfromsetting = 'true'
     
     
    }
    else {
      if ((event.target.checked === true)) {
        halfdayfromsetting = 'true'
        radiodisplaysetting = 'block'

        if ((new Date(this.state.startDate).getTime()) === (new Date(this.state.endDate).getTime())) {

          checkboxshowsetting = 'none'

          radiodisplaysetting = 'block'
        }
        else {
          checkboxshowsetting = 'block'
          radiodisplaysetting = 'none'
        }

      }
      else {

        halfdayfromsetting = 'false'
        radiodisplaysetting = 'none'
        if (((this.state.startDate).getTime()) === ((this.state.endDate).getTime())) {
          checkboxshowsetting = 'none'
        }
        else {
          checkboxshowsetting = 'block'

        }
      }
    }

    radiodisplayreqsetting = (radiodisplaysetting === 'block') ? true : false

    this.setState({
      radiodisplay: radiodisplaysetting,
      halfdayfrom: halfdayfromsetting,
      checkboxdisplay: checkboxshowsetting,
      radiodisplayreq: radiodisplayreqsetting

    });
  };

  handleEndDateChange = date => {
     
    if (date === ''|| date==null) {
     
      return
    }

    if (this.state.startDate === '') {
      this.setState({
      messageShow: true,
        message: 'Please select Start Date'

      });
   
      return
    }
    const oneDay = 24 * 60 * 60 * 1000;
 
    let checkboxshowsetting = 'block'
    let radiodisplaysetting = 'block'
    let radiodisplayreqsetting = true
    if ((this.state.startDate).getTime() === date.getTime()) {
      checkboxshowsetting = 'none'
      if (this.state.halfdayfrom === 'true') {
        radiodisplaysetting = 'block'
      }
      else {
        radiodisplaysetting = 'none'
      }
    }
    else {
      checkboxshowsetting = 'block'
      radiodisplaysetting = 'none'
    }
    radiodisplayreqsetting = (radiodisplaysetting === 'block') ? true : false
    console.log("Setting State : ", checkboxshowsetting, radiodisplaysetting);

    this.setState({
      endDate: date,
      checkboxdisplay: checkboxshowsetting,
      radiodisplay: radiodisplaysetting,
      radioreq: radiodisplayreqsetting
    });
  }

  handleHalfDayTime = (event) => {

    this.setState({
      halfdaytime: event.target.value,

    });

  }

  toHandleHalfday = (event) => {

    if ((event.target.checked === true)) {
      this.setState({
        halfdayto: 'true',

      });

    }
  }

  handleStationPerm = (event) => {
    if ((event.target.checked === true)) {
      this.setState({
        outstationperm: 'true',

      });
    }
  }

  handleAddress = (event) => {
    this.setState({
      address: event.target.value,

    });
  }

  handlePurpose = (event) => {
    this.setState({
      purpose: event.target.value,

    });
  }
  handlePhoneno = (event) => {

  
  //     let isValidPhoneNumber = validator.isMobilePhone(event.target.value)
  //    if( isValidPhoneNumber)
  {
    this.setState({
      leavephoneno: event.target.value,

    });
  }
  // else
  // // {
  //   this.setState({
  //    messageShow: true,
  //    message:'Enter Valid Phone number'

  //   });
  // }
  }

  handlePostApproval = (event) => {
    this.setState({
      postapprovalval: event.target.value,

    });
  }
  addDays = (date, number) => {
    return date + number;
  }

  formatDate = (date, format = 'YYYY-MM-DD') => {
    return date.getFullYear() + "-" + (date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "-" + (date.getDate() <= 9 ? ("0" + date.getDate()) : date.getDate());
  }
  formatDateInDDMMYYY = (date, format = 'YYYY-MM-DD') => {
    return (date.getDate() <= 9 ? ("0" + date.getDate()) : date.getDate()) + "-" + (date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "-" + date.getFullYear();
  }
  convertGMTtoIST = (date) => {

    return new Date(date.getTime() + 5.5 * 60 * 60 * 1000)
  }

  modifyDateString = (data) => {
    try {
      data.startDate = data.startDate !== '' ? this.convertGMTtoIST(data.startDate) : ''
      data.endDate = data.endDate !== '' ? this.convertGMTtoIST(data.endDate) : ''
      // data.startDate = data.startDate !== '' ?data.startDate.toLocalString(): ''
      //   data.endDate = data.endDate !== '' ?data.endDate.toLocalString() : ''


      return data;
    } catch (e) {
      console.error("Failed to convert Date to String >> ", e);
      return data;
    }
  }

  submitHandler = async (event) => {

    event.preventDefault();
    // event.stopPropagation();
    console.log(this.state)
    const oneDay = 24 * 60 * 60 * 1000;
    if (((this.state.endDate - this.state.startDate) / oneDay) > 5) {
      this.setState({
        messageShow: true,
        message: 'Maximum 5 Days leave period is allowed'

      });
    
      return
    }

    
    if ((this.state.startDate > this.state.endDate)) {

      this.setState({
        messageShow: true,
        message: 'Start date cannot be after end date'

      });
      return;
    }

    if (this.props.shiftType === 'GENERAL') {
      if (this.state.endDate.getDay() < this.state.startDate.getDay()) {

        this.setState({
          messageShow: true,
          message: 'Leave cannot include Weekends and Holidays'

        });
        //  alert('Leave cannot include Weekends and Holidays')
        return
      }
    }
    let url = Constants.BASE_URL + Constants.FORM_URL;
    console.log(url);
    console.log("Final Params going >> ", this.state);

    let params = this.state;
    let self = this;
    // params.startDate = this.formatDateInDDMMYYY(params.startDate)
    // params.endDate = this.formatDateInDDMMYYY(params.endDate)
    this.modifyDateString(params)
    // params.endDate = this.modifyDateString(params.endDate)
    // Ajax Call
    let response = await axios.post(url, params).then((response) => {
      console.log(response);
      this.setState({
        messageShow: true,
        message: response.data
      })

      ReactDOM.findDOMNode(this.leaveForm).reset();
      ReactDOM.findDOMNode(this.datepickerTo).value='';
      ReactDOM.findDOMNode(this.datepickerFrom).value='';

    })
      .catch((error) => {
        console.log(error);
      });


    return;


  }



  addDate(days) {
    return new Date(new Date() + 1000 * 60 * 60 * 24 * days);
  }

  subDays(days) {
    return new Date(new Date() - 1000 * 60 * 60 * 24 * days);
  }


  render() {

   






    console.log('in form tab', this.props.userData.employeecode)



    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };

    let weekdayprop = this.props.weekday ? isWeekday : ''

    return (

      <Jumbotron style={{ paddingBottom: '3%', paddingTop: '4%', boxShadow: '2px 4px #bbedb9', border: '1px solid #bbedb9' }}>
        <Form onSubmit={ this.submitHandler}>
      
       
          <h4  style={{ textAlign: 'center' }}>Leave Application Form</h4><br/>
          
        
          <Row>
            <Col>
              <Form.Group>
                <Row>
                  <Col colSpan='2'>
                    <Form.Label ><b>Leave From : </b> </Form.Label>&nbsp;&nbsp;&nbsp;
                 
                    <DatePicker className="form-control" required  id="leaveFrom" maxDate={this.subDays(-15)} minDate={this.subDays(15)} filterDate={weekdayprop} selected={this.state.startDate} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} dateFormat="dd/MM/yyyy" onChange={this.handleStartDateChange} />
                  </Col>
                 
                </Row>

                <Form.Group  >
                  <Row>
                    <Col><Form.Check type="checkbox" label="Half day" id="halfDayFrom" onChange={this.fromHandleHalfday} />
                    </Col><Col> <Form.Check onChange={this.handleHalfDayTime} type="radio" label="First Half" value="forenoon" name="fromhalf" style={{ display: this.state.radiodisplay }} required={this.state.radiodisplayreq} />
                    </Col> <Col><Form.Check onChange={this.handleHalfDayTime} type="radio" label="Second Half" value="afternoon" name="fromhalf" style={{ display: this.state.radiodisplay }} required={this.state.radiodisplayreq} />
                    </Col>
                  </Row>
                </Form.Group>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Row>
                  <Col colSpan='2'   style={{ float: 'right' }}>
                    <Form.Label ><b>Leave To :</b></Form.Label>&nbsp;&nbsp;&nbsp;
                
                    <DatePicker className="form-control" required id="leaveTo" filterDate={weekdayprop} selected={this.state.endDate} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} dateFormat="dd/MM/yyyy" onChange={this.handleEndDateChange} minDate={this.state.startDate} maxDate={this.subDays(-21)} />
                  </Col>
                </Row>
                <Form.Check type="checkbox" label="Half day" id="halfDayTo" style={{ display: this.state.checkboxdisplay }} onChange={this.toHandleHalfday} />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group>
            <Row>
              <Col colSpan="2">
                <Form.Check type="checkbox" name="outstationperm" onChange={this.handleStationPerm} id="outstationperm" label="Permission to leave station required" id="halfDayTo" />
                <Form.Label><b>Address during leave period</b></Form.Label>

                <Form.Control as="textarea" rows="2" required name="address" onChange={this.handleAddress} />
               </Col>
                </Row><Row>
                  <Col>
                <Form.Label><b>Contact Mobile no.</b></Form.Label>
                <Form.Control type="text" required  name="leavephoneno" pattern="^[0-9]{10}$"  onInvalid="this.setCustomValidity('Enter valid mobile number')" onInput="this.setCustomValidity('')" onChange={this.handlePhoneno} />
              </Col>
              <Col></Col>
            </Row>

          </Form.Group>
          <Form.Group>
            <Row>
              <Col colSpan="2">
                <Form.Label><b>Purpose</b></Form.Label>
                <Form.Control required as="textarea" rows="1" name="purpose" onChange={this.handlePurpose} />
              </Col>
            </Row>

          </Form.Group>
          <Form.Group style={{ display: this.state.postapproval }}>
            <Row>
              <Col colSpan="2">
                <Form.Label ><b>Reason for post approval</b></Form.Label>
                <Form.Control as="textarea"  required={this.state.postapprovalreq} rows="1" name="postapproval" onChange={this.handlePostApproval} />
              </Col>
            </Row>
          </Form.Group>

          <div style={{ textAlign: 'center' }}>
            <Button variant="success" type="submit" >
              Submit Leave Request
              </Button>
          </div>

        </Form>
        <MessageModal
          show={this.state.messageShow}
          message={this.state.message}
          action={'apply'}
          onHide={() => this.hideMessageModal()}

        />
      </Jumbotron>
    );
  }
}

export default FormTab