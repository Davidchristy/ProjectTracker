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
    this.callAPI();
  }

  handleUserLogin(data){
    this.setState({
      username: data.username,
      userRole: data.userRole
    })
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
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
          </div>
      );
    }
  }
}

export default App;
