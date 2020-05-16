// import React, { Component } from 'react'


import React, { Component } from 'react'




class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {

      //  let showHideClassName = this.props.show ? "modal display-block" : "modal display-none";
      let showHideClassName="modal display-block";
      console.log('I am in modal');
        return (
        <div className = "modal display-block" >
            <section className = "modal-main" > <p>Hi you are stupid</p>
            <button onClick = { this.props.handleClose } > close </button> 
            </section> 
           </div>
            
        )
    }
}

export default Modal




// const Modal = ({ handleClose, show, children }) => {
   

//     return ( 
//     );
// };
// export default Modal;