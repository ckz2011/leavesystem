import React, { Component } from 'react'
import {Tabs,Tab,Container } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import FormTab from '../Components/FormTab'


class ApplyLeave extends Component {
  constructor(props) {
    super(props)

    

  }
componentDidMount() {
  console.log("ddd")
}


render() {
  return(
    <Container style={{ justifyContent: 'center', width: '80%', marginTop: "1%" }}>
   
    <Tabs variant='tabs'  defaultActiveKey="genShift" id="uncontrolled-tab-example">
       
    <Tab eventKey="genShift" title="General Shift"  >
    <FormTab weekday={true} userdata = "GENERAL" />
    </Tab>
    <Tab eventKey="shifOps" title="Shift Operations"  >
    <FormTab weekday={false} shiftType = "SHIFTS" />
    </Tab>
   
  </Tabs>
  </Container>
  )
}
}

export default ApplyLeave