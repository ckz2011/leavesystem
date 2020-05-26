import React, { Component } from 'react'
import ApplyLeave from '../Modules/ApplyLeave';
import ViewRequests from '../Modules/ViewRequests';
import PendingRequest from '../Modules/PendingRequest';
import ReportingOfficers from '../Modules/ReportingOfficers';
export default class MainPanel extends Component {
    render() {
        //Get button value

        // It is taking String Literal Instead of Classes Imported

        let loadPannelValue = this.props.LoadPanel;
        let LoadScreen = '';

        switch (loadPannelValue) {
            case "ApplyLeave":
                LoadScreen = ApplyLeave
                break;
            case "ViewRequests":
                LoadScreen = ViewRequests
                break;
                case "PendingRequest":
                    LoadScreen= PendingRequest
                    break;
                case "ReportingOfficers":
                LoadScreen=ReportingOfficers
                break;
            default:
                break;
        }
        
        console.log(this.props.LoadPanel)
        return (
            <div>
                {/* <div>Hello</div> */}
              <LoadScreen userData={this.props.userData}/>
            </div>
        )
    }
}
