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

            let response = await axios.post(url, this.state);

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

        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        }, {

        }]

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Age',
            accessor: 'age',
            // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }
    ]



        return (

            <ReactTable
                data={data}
                columns={columns}
            />
        )
    }
}

export default ViewRequests