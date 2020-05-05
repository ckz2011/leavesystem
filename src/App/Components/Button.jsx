import React, { PureComponent } from 'react'
import { StyleSheet, css } from 'aphrodite'
import privileges from '../Config/privileges';


const Style = StyleSheet.create({

    Button: {
        fontFamily: 'Arial',
        fontSize: '14px',
        background: 'white',
        border: '1px solid #bbedb9',
        borderRadius: '10px',
        padding: '10px 10px',
        cursor: 'pointer',
        display: 'inline-block',
        textAlign: 'center',
        verticalAlign: 'center',
        transition: 'all 0.3s',
        margin: '5px',
        color: '#00711b',
        fontWeight: '500',
        letterSpacing: '0.4px',
        ':hover:enabled': {
            color: '#4a4f4a',
            background: '#5ce356',
            // border: '1px solid #05a62b',
            opacity: '0.9'
        },
        ':focus:enabled': {
            color: '#fff',
            background: '#05a62b',
            border: '1px solid #05a62b',
            opacity: '0.9'
        },
        ':first-child': {
            marginLeft: '0px',
        },
        ':last-child': {
            marginRight: '0px',
        },
        ':disabled': {
            pointerEvents: 'none',
            opacity: '0.6'
        },
        '@media (min-width: 1200px) and (max-width: 1440px)': {
            minWidth: '85px'
        },
        '@media (min-width: 1440px)': {
            minWidth: '105px'
        }
    }
});

class Button extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {



        }
    }
    loadMainContent = (event) => {
        this.props.method(event);
        this.setState({
            color: '#fff',
            background: '',
            border: '1px solid #05a62b',
            opacity: '0.9',
             

        });
        // return (privileges[this.props.role][event.target.value]);

    }
    render() {


        // <input type="button" key="delimBtn" className={css(Style.Button)} id="delimBtn" value="Delim Ids" onClick={this.showDelimPopup} />

        return (

            <input type="button"  className={css(Style.Button)} id={this.props.id} value={this.props.value} onClick={this.loadMainContent} />
        )
    }
}

export default Button