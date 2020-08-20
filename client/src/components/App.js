import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.js'
import Login from "./Login";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      username: "",
      userRole: ""
    };
  }

  handleUserLogin(data){
    this.setState({
      username: data.username,
      userRole: data.userRole
    })
  }

  render() {

    const jwt = localStorage.getItem('jwt')
    if(!jwt){
      return (
          <Login App = {this}/>
          )
    } else {
      return (
          <div>
            <Header username = {this.state.username} role = {this.state.userRole}/>
            <img src="https://www.pinclipart.com/picdir/middle/98-982775_counseling-center-work-under-construction-clipart.png"/>
          </div>

      );
    }
  }
}

export default App;
