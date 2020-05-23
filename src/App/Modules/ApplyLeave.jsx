import React, { Component } from 'react'
import {Tabs,Tab,Container } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import FormTab from '../Components/FormTab'


class ApplyLeave extends Component {
  constructor(props) {
    super(props)

    

  }
componentDidMount() {
  console.log("component mounted")
  
}


render() {
  return(


    <Container style={{ justifyContent: 'center', width: '55%', marginTop: "1%" }}>
   
    <Tabs variant='tabs'  defaultActiveKey="genShift" id="uncontrolled-tab-example"> 
       
     <Tab eventKey="genShift" title="General Shift"  >
    <FormTab weekday={true} userData={this.props.userData} shiftType = "GENERAL" />
     </Tab> 
    <Tab eventKey="shifOps" title="Shift Operations"  >
    <FormTab weekday={false} userData={this.props.userData} shiftType = "SHIFTS" />
    </Tab> 
   
   </Tabs> 

  
  </Container>
  )
}
}

export default ApplyLeave