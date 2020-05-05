import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Button from '../Components/Button'
import privileges from '../Config/privileges'

const Style = StyleSheet.create({

    DivActionButtonsDoc: {
        zIndex: '1',
        background: 'transparent',
        alignItems: 'center',
        minHeight: '70px',
        display: 'block',
        paddingTop: '70px',
        textAlign: 'center',
        paddingBottom: '10px',
        backgroundColor: '#e9ecef'
    }

});

class ButtonPanel extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
    getButtonvalue = (event) => {
        console.log("getbuttonval ", event);
        this.props.method(event)
      


    }

    render() {
        let actionsButtons = new Array();
        //get role from privileges

        var role = 'approver'
        var i = 0;
        for (var action in privileges[role]) {
            i = i + 1;
            // for( in privileges[role])
            actionsButtons.push(<Button key={i} value={action} id={privileges[role][action]} data-toggle="buttons" role={role} method={this.getButtonvalue} />);

        }
        return (
            <div className={css(Style.DivActionButtonsDoc)}>
                {actionsButtons}
            </div>

        )
    }
}

export default ButtonPanel