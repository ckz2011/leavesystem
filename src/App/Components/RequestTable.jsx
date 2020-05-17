import React, { Component } from 'react'
import CustomModal from './CustomModal'
import ReactTable from 'react-table';
import { StyleSheet, css } from 'aphrodite'
import axios from 'axios';
import Constants from '../Config/core';

const Style = StyleSheet.create({
    ClickButtons: {
        border: '1px solid #c3c1c1',
        padding: '4px',
        borderRadius: '3px',
        color: '#00334e',
        textAlign: 'center',
        fontSize: '12px',
        transition: 'all 0.5s',
        minWidth: '46%',
        margin: '2% 2% 2% 2%',
        ':hover': {
            cursor: 'pointer',
            backgroundColor: '#3ab6ff',
            color: 'white',
            border: '1px solid #3ab6ff',
        },
        ':focus': {
            cursor: 'pointer',
            backgroundColor: '#3ab6ff',
            color: 'white',
            border: '1px solid #3ab6ff',
        }
    }

})


class RequestTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            userData: '',
            reqData: '',
            action: '',
            pageSize: 10
        };

    }


    showModal = (userData, reqData, action) => {
        this.setState({
            show: true,
            userData: userData,
            reqData: reqData,
            action: action,



        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    processLeaveRequest = async (userData, reqData, action) => {
        let url = Constants.BASE_URL + Constants.PROCESSLVREQ_URL;
        console.log(url);
        console.log("Final Params going >> ", userData);
        console.log("Final Params going >> ", reqData);
        console.log("Final Params going >> ", action);
        let jsonData = {
            user: userData,
            lvdetails: reqData,
            action: action
        }
        console.log('jsonData', JSON.stringify(jsonData))
        // Ajax Call
        let response = await axios.post(url, jsonData);
        if (response.data) {
            this.setState({ show: false });
        }
        console.log("Leave applied")


    }



    render() {
        const data = this.props.leaveReqDetails
        let actions;
        let applyingemployee;
        switch (this.props.role) {
            case 'approver':
                actions =
                {
                    Header: 'Action',
                    accessor: '',
                    Cell: row => (
                        // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
                        <div>
                            <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)} onClick={() => this.showModal(this.props.userData, row.original, "APPROVE")}>
                                Approve
                        </div>
                            <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)} onClick={() => this.showModal(this.props.userData, row.original, "REVERT")}>
                                Revert
       </div>
                        </div>
                    )
                }
                applyingemployee = {
                    Header: 'Employee name',
                    accessor: 'employeename'
                }
                break;
            case 'forwardoff':
                actions =
                {
                    Header: 'Action',
                    accessor: '',
                    Cell: row => (
                        // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
                        <div>
                            <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)} onClick={() => this.showModal(this.props.userData, row.original, "FORWARD")} >
                                Forward
                                </div>
                            <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)} onClick={() => this.showModal(this.props.userData, row.original, "REVERT")}>
                                Revert
       </div>
                        </div>

                    )
                }

                applyingemployee = {
                    Header: 'Employee name',
                    accessor: 'employeename'
                }
                break;
            case 'employee':
                actions =
                {
                    Header: 'Action',
                    accessor: '',
                    Cell: row => (
                        // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
                        <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)}>
                            Cancel
                        </div>

                    )
                }
                applyingemployee = ''
                break;
            default:
                break;

        }


        const columns = [
            applyingemployee,
            {
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
                Header: 'Status',
                accessor: 'stage',
                Cell: props =>
                    <div>
                        {
                            props.original.stagesList.map((e) => <div style={{ "display": "block", "margin": "3px" }}>
                                <div style={{ "display": "inline-flex" }}>
                                    <div style={{ "backgroundColor": "#24cfaa", "height": "12px", "width": "12px", "borderRadius": "12px", "marginTop": "2px" }} />
            &nbsp;
            &nbsp;
            <div style={{ "fontSize": "12px" }}>
                                        {e}
                                    </div>
                                </div>
                            </div>)


                        }
                    </div>
                // Custom cell components!
            },
            {
                Header: 'No of leaves',
                accessor: 'noofleaves',
                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            },
            {
                Header: 'Details',
                Cell: row => {
                    return (
                      <div>
                        <span className="class-for-name">{row.original.purpose}</span><br/>
                        <span className="class-for-description">{row.original.postapprovalval}</span>
                      </div>
                    )
                  }
             

                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }
        ]


        columns.push(actions)
        // const [modalShow, setModalShow] = React.useState(false);

        return (
            <div>
               

                    <CustomModal
                        show={this.state.show}
                        userData={this.state.userData}
                        reqData={this.state.reqData}
                        action={this.state.action}
                        actionFunction={(a, b, c) => this.processLeaveRequest(a, b, c)}
                        onHide={() => this.hideModal()}
                    />
              


                <ReactTable className="-striped -highlight"
                    data={this.props.leaveReqDetails}
                    columns={columns}
                    showPagination={true}
                    defaultPageSize={this.state.pageSize}
                />

            </div>
        )
    }
}

export default RequestTable
