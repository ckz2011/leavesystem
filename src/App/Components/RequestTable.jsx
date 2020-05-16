import React, { Component } from 'react'
// import Modal from './Modal'
import ReactTable from 'react-table';
import { StyleSheet, css } from 'aphrodite'
import {Button,Modal}  from 'react-bootstrap'
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
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }


class RequestTable extends Component {
    constructor(props) {
        super(props)
       this. state = { show: false };
       
    }
    

    showModal = () => {
       
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };
  
  

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
                        <div>  <button  type="button" onClick={this.showModal}>
                        open
                      </button>
                            <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)}>
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
                        <div> <button type="button" class="ClickButtons" onClick={this.showModal}>
                        open
                      </button>
                            <div className={css([Style.ClickButtons, Style.SubCell])} data-value={JSON.stringify(row.original)}>
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
                Header: 'Purpose',
                accessor: 'purpose',
                // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
            }
        ]


        columns.push(actions)
        // const [modalShow, setModalShow] = React.useState(false);

        return (
            <div>
                {/* <Modal show={this.state.show} handleClose={this.hideModal}/> */}
                <>
      <Button variant="primary" onClick={() => this.showModal()}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={this.state.show}
        onHide={() => this.hideModal()}
      />
    </>
                
       
                {/* <ReactTable striped bordered hover
                    data={this.props.leaveReqDetails}
                    columns={columns}
                /> */}

            </div>
        )
    }
}

export default RequestTable
