import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Login from "./Login";
import {Button} from "react-bootstrap";

type MyProps = {
};
type MyState = {
  username: string,
  userRole: string
};
class App extends React.Component<MyProps, MyState> {
  // TODO: I should stay away from typing things any like this, but will come back to it later
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      userRole: ""
    };
  }

  handleUserLogin(data: { username: string; userRole: string; }){
    this.setState({
      username: data.username,
      userRole: data.userRole
    })
  }

  modifyState(changedState: {}){
    this.setState((current) => ({...current,
      changedState
    }))
  }

  render() {

    const jwt = localStorage.getItem('jwt')
    if(!jwt){
      // @ts-ignore
      return (
          <Login App = {this}/>
          )
    } else {
      return (
          <div>
            <Header username = {this.state.username} role = {this.state.userRole}/>
            <Button onClick={()=>this.modifyState({showCreateCardModal: true})}>
              Create Card
            </Button>
          </div>

      );
    }
  }
}

export default App;
