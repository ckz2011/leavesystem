import React from 'react';
import logo from './logo.svg';
import './App.css';
import './modal.css'

import {HashRouter as Router , Route } from 'react-router-dom';


// import LoginForm from './App/Screens/Login';
import Loginv2 from './App/Screens/Loginv2';
import Home from './App/Screens/Home'

function App() {
    return ( 
      <Router>
        <Route path = "/login" component = { Loginv2 } /> 
        <Route path = "/home" component = { Home }/> 
        {/* <Route path = "/" component = { Loginv2 }/>  */}
      </Router>
    );
}

export default App;