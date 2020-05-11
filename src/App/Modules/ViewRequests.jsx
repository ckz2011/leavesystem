import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import Constants from '../Config/core';
import ReactTable from 'react-table';
import { StyleSheet, css } from 'aphrodite'
import makeData from './makeData'
const Style = StyleSheet.create({

});


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
                console.log("emoyeecode",this.props.userData)
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
        console.log('in view request lv data', this.state.leaveReqDetails)

        const data =this.state.leaveReqDetails
    

        const columns = [{
            Header: 'Request Id',
            accessor: 'lvrqid' // String-based value accessors!
        }, {
            Header: 'Leave From',
            accessor: 'startDate',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        },
            {
                Header: 'Leave To',
                accessor: 'endDate',
                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            },

            {
                Header: 'Current Status',
                accessor: 'stage',
                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            },
            {
                Header: 'No of leaves',
                accessor: 'noofleaves',
                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }



            
    ]



        return (
            <Container style={{ justifyContent: 'center', width: '80%', marginTop: "1%" }}>
            <ReactTable
                data={data}
                columns={columns}
            />
            </Container>
        )
    }
}

export default ViewRequests