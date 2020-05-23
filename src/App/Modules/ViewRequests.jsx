import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import Constants from '../Config/core';


import RequestTable from './../Components/RequestTable'




class ViewRequests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leaveReqDetails: []

        }

    }


    
    componentDidMount = async () => {
        try {

            let url = Constants.BASE_URL + Constants.LVREQ_URL;
            console.log(url);

            // Ajax Call

            let response = await axios.post(url, this.props.userData);
            console.log("employeecode", this.props.userData)
            console.log('in lv request lv data', this.state.leaveReqDetails)
            console.log(response.data);
            console.log(response.status);
            if (response.data) {
                console.log("in view leave request page", response.data.length)

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
    };

    render() {
        console.log('in view request', this.props.userData)
   

       



        return (
            <Container fluid style={{marginLeft:'0px',marginTop:'5px'}}>
             <RequestTable userData={this.props.userData} role='employee'  leaveReqDetails={this.state.leaveReqDetails}  ></RequestTable>
            </Container>
        )
    }
}

export default ViewRequests