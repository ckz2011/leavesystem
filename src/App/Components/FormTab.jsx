import React, { Component } from 'react'
import { Form, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Constants from '../Config/core';
import axios from 'axios';

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
      employeecode: 'MH00682'

    }
  }
  componentDidMount() {
    console.log("ddd")
  }

  handleStartDateChange = date => {
    let postapprovalstatus = 'none'
    let postapprovalreqstatus = false
    if (date > new Date()) {
      postapprovalstatus = 'none'
      postapprovalreqstatus = false
    }
    else {
      postapprovalstatus = 'block'
      postapprovalreqstatus = true
    }


    if (date > (this.state.endDate) && (this.state.endDate) !== '') {
      alert('Start date cannot be after end date')
      return;
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
      radiodisplayreq: radiodisplayreqsetting
    });
  };


  fromHandleHalfday = (event) => {
    let halfdayfromsetting = 'false'
    let radiodisplaysetting = 'none'
    let checkboxshowsetting = 'none'
    let radiodisplayreqsetting = false
    if ((this.state.startDate === '') || (this.state.endDate === '')) {
      alert('Please select Start Date and End Date');
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

    if (this.state.startDate === '') {
      alert('Please select Start Date');
      return
    }

    const oneDay = 24 * 60 * 60 * 1000;
    if (((date - this.state.startDate) / oneDay) > 5) {
      alert('Maximum 5 Days Leave is allowed')
      return
    }

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
    this.setState({
      leavephoneno: event.target.value,

    });
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
    return date.getFullYear() + "-" + (date.getMonth() < 9 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + "-" + (date.getDate() <= 0 ? ("0" + date.getDate()) : date.getDate());
  }

  modifyDateString = (data) => {
    try {
      data.startDate = data.startDate !== '' ? this.formatDate(data.startDate) : ''
      data.endDate = data.endDate !== '' ? this.formatDate(data.endDate) : ''
      return data;
    } catch (e) {
      console.error("Failed to convert Date to String >> ", e);
      return data;
    }
  }

  submitHandler = async (event) => {
    event.preventDefault();

    console.log(this.state)
    const oneDay = 24 * 60 * 60 * 1000;
    if (((this.state.endDate - this.state.startDate) / oneDay) > 5) 
      {
        alert('Maximum 5 Days Leave is allowed')
        return
      }
    
    if (this.props.shiftType === 'GENERAL') {
      if (this.state.endDate.getDay() < this.state.startDate.getDay()) {
        alert('Leave cannot include Weekends and Holidays')
        return
      }



      else {
        let url = Constants.BASE_URL + Constants.FORM_URL;
        console.log(url);
        console.log("Final Params going >> ", this.state);

        let params = (this.state);
        // Ajax Call
        let response = await axios.post(url, params);
        if (response.data = true)
          console.log("Leave applied")

      }
    }
    console.log(this.state)

  }




  render() {

    // {this.props && this.props.userData && this.state.employeecode==''?

    // this.setState({

    //   employeecode:this.props.userData.employeecode
    // })
    // : ''}

    console.log('in form tab', this.props.userData.employeecode)



    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };

    let weekdayprop = this.props.weekday ? isWeekday : ''

    return (

      <Jumbotron style={{ paddingBottom: '3%', paddingTop: '4%', boxShadow: '2px 4px #bbedb9', border: '1px solid #bbedb9' }}>
        <Form onSubmit={this.submitHandler}>
          <h4 style={{ textAlign: 'center' }}>Leave Details</h4>
          <Row>
            <Col>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label ><b>Leave From :</b> </Form.Label>
                  </Col>
                  <Col>
                    <DatePicker required id="leaveFrom" filterDate={weekdayprop} selected={this.state.startDate} selectsStart startDate={this.state.startDate} endDate={this.state.endDate} dateFormat="dd/MM/yyyy" onChange={this.handleStartDateChange} />
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
                  <Col>
                    <Form.Label ><b>Leave To :</b></Form.Label>
                  </Col>
                  <Col>
                    <DatePicker required id="leaveTo" filterDate={weekdayprop} selected={this.state.endDate} selectsEnd startDate={this.state.startDate} endDate={this.state.endDate} dateFormat="dd/MM/yyyy" onChange={this.handleEndDateChange} minDate={this.state.startDate} />
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
                <Form.Label><b>Contact no. during leave period</b></Form.Label>
                <Form.Control type="number" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required name="leavephoneno" onChange={this.handlePhoneno} />
              </Col>
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
                <Form.Control as="textarea" required={this.state.postapprovalreq} rows="1" name="postapproval" onChange={this.handlePostApproval} />
              </Col>
            </Row>
          </Form.Group>

          <div style={{ textAlign: 'center' }}>
            <Button variant="success" type="submit" >
              Submit Leave Request
              </Button>
          </div>

        </Form>
      </Jumbotron>
    );
  }
}

export default FormTab