import React, { PureComponent } from 'react'
import Header from '../Components/Header'
import ButtonPanel from '../Components/ButtonPanel'
import MainPanel from '../Components/MainPanel'

class Home extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            selected: 'ApplyLeave'

        }
    }

    getSelectedButton = (event) => {

        console.log("In Home", event)
        this.setState({ selected: event.target.id })


    }



    render() {

        return (
            <div>
                <Header userData={this.props.location.userData} />
                <ButtonPanel method={this.getSelectedButton} userData={this.props.location.userData} />
                <MainPanel LoadPanel={this.state.selected} userData={this.props.location.userData} />
            </div>

        )
    }
}

export default Home