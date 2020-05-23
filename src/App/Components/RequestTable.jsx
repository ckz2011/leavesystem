import React, { Component } from 'react'
import CustomModal from './CustomModal'
import MessageModal from './MessageModal'
import ReactTable from 'react-table';
import { StyleSheet, css } from 'aphrodite'
import axios from 'axios';
import Constants from '../Config/core';
import { Tooltip,OverlayTrigger } from 'react-bootstrap'

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
            pageSize: 10,
            revRemarks:'',
            showRevert:'none',
            messageShow:false,
            message:""
                  
            
        };

    }
    setRevremarks=(event)=>{
        this.setState({
      
          revRemarks:event.target.value
           
        
        });
        console.log("event",event.target);
        console.log("revRemarks",this.state.revRemarks);  

    }

    showModal = (userData, reqData, action) => {
        let showrevert='none';
       
        if (action=='REVERT')
        {
           // alert(action)
            showrevert='block'; 
        }
        
        this.setState({
            show: true,
            userData: userData,
            reqData: reqData,
            action: action,
            showRevert:showrevert
          



        });
    };
    showMessageModal = () => {
        
        this.setState({
            messageShow: true

        });
    };

    // resetForm = () => { this.setState({startDate: "", endDate: "", message: ""}); }

    hideModal = () => {
        this.setState({ show: false });
    };
    hideMessageModal = () => {
       
        this.setState({ messageShow: false });
    };

    processLeaveRequest = async (userData, reqData, action,Remarks) => {
        let url = Constants.BASE_URL + Constants.PROCESSLVREQ_URL;
        console.log(url);
        console.log("Final Params going >> ", userData);
        console.log("Final Params going >> ", reqData);
        console.log("Final Params going >> ", action);
        console.log("Final Params going >> ", this.state.revRemarks);
        let jsonData = {
            user: userData,
            lvdetails: reqData,
            action: action,
            revRemarks:Remarks
        }
        console.log('jsonData            ', jsonData)
        // Ajax Callnp
        let response = await axios.post(url, jsonData);
        this.setState({ show: false });
      
        if (response.data) {
          
            this.setState({
                message:response.data,
                
                messageShow: true });
          
        }
        else 
        this.setState({
            message:'UNABLE TO CONNECT TO SERVER',
            
            messageShow: true });
          


    }
    renderTooltip=(props)=> {
        return (
          <Tooltip id="button-tooltip" {...props}>
            Forwaded/Approved requests will require permission of respective officer for cancellation
          </Tooltip>
        );
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
                        <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={this.renderTooltip}
                      >
                       
                        <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)} onClick={() => this.showModal(this.props.userData, row.original, "CANCEL")}>
                            Cancel
                        </div>
                        </OverlayTrigger>
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
                Header: 'Id',
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
                Header: 'leaves',
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
                        actionFunction={(a, b, c,d) => this.processLeaveRequest(a, b, c,d)}
                        onHide={() => this.hideModal()}
                        showRevert={this.state.showRevert}
                        revertFunction={this.setRevremarks}
                        revRemarks={this.state.revRemarks}
                    />

                    <MessageModal
                        show={this.state.messageShow}
                        message={this.state.message}
                        action={this.state.action}
                        onHide={() => this.hideMessageModal()}
                      
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
