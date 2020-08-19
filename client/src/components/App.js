import React from 'react';
// import logo from './logo.svg';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    this.callAPI();
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    return (
        <div>
          <Header/>
        </div>
    );
  }
}

export default App;
