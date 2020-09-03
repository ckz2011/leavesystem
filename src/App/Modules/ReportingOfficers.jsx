import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Constants from '../Config/core';
import axios from 'axios';

import RequestTable from './../Components/RequestTable'





class ReportingOfficers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listOfForwardingOff: [],
            leaveReqDetails:[]

        }
    }
    loadRequestDetails= async (officer) =>
    {
      console.log('loadRequestDetails called')
      try {

          let url = Constants.BASE_URL + Constants.PENDINGLVREQ_URL;
          console.log("hereeeeeeeeeeeeeeeeeeeeeee",officer);

          // Ajax Call

          let response = await axios.post(url, officer);
          console.log(response.data);
          console.log(response.status);
          if (response.data) {
              console.log("in accordion", response.data.length)

              this.setState({

                  leaveReqDetails: response.data
              })

          }
          else {
              alert('No Leave request');
          }
      } catch (e) {

          console.log(e);
      }
    }

    loadForwardingOfficers = async () => {
        console.log('Forwarding Officers called')
        try {

            let url = Constants.BASE_URL + Constants.FORWARDINGOFFLIST_URL;
            console.log(url);

            // Ajax Call

            let response = await axios.post(url, this.props.userData);

            console.log(response.status);
            if (response.data) {
                console.log("In getforwarding officer", response.data.length)

                this.setState({

                    listOfForwardingOff: response.data
                })
               console.log(" list of officer",this.state.listOfForwardingOff)

            }
            else {
                alert('No Forwarding Officer');
            }
        } catch (e) {

            console.log(e);
        }
    }
    componentDidMount = async () => {
        this.loadForwardingOfficers();
    }
  printHello=()=>
  {
      alert('say hello')
  }
    render() {
        let ForwardingOfficers = new Array();
        var i = 0;
        for (let officer in this.state.listOfForwardingOff) {

                console.log("officer is",officer);
            i = i + 1;
            // for( in privileges[role])
            ForwardingOfficers.push(<Card>
                <Card.Header><Accordion.Toggle as={Button} variant="link" key={i} eventKey={i} onClick={()=>this.loadRequestDetails(this.state.listOfForwardingOff[officer])} >{ this.state.listOfForwardingOff[officer].employeename}</Accordion.Toggle></Card.Header>
                <Accordion.Collapse eventKey={i}>
                    <Card.Body>  <RequestTable userData={this.props.userData} role={this.props.userData.userrole}  leaveReqDetails={this.state.leaveReqDetails}   loadRequestDetails={()=>this.loadRequestDetails(this.state.listOfForwardingOff[officer])}/></Card.Body>
                </Accordion.Collapse>
            </Card>);

        }

        return (
            <div>

                <Accordion>
               { ForwardingOfficers}
                </Accordion>

            </div>
        )
    }
}


export default ReportingOfficers