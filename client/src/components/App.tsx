import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'
import Login from "./Login";
import CreateCardModal from './CreateCardModal'
import {Button} from "react-bootstrap";

type MyProps = {
};
type MyState = {
  username: string,
  userRole: string,
  showCreateCardModal: boolean
};
class App extends React.Component<MyProps, MyState> {
  // TODO: I should stay away from typing things any like this, but will come back to it later
  constructor(props: any) {
    super(props);
    this.state = {
      username: "David",
      userRole: "admin",
      showCreateCardModal: true
    };
  }

  handleUserLogin(data: { username: string; userRole: string; }){
    this.setState({
      username: data.username,
      userRole: data.userRole
    })
  }

  //This needs to be in the parent of CreateCardsModal, which probably wont be here
  handleShowHideCreateCardModal(show: boolean){
    this.setState((current) => ({...current,
      showCreateCardModal: show
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
            <Button onClick={()=>{this.handleShowHideCreateCardModal(true)}}>
              Create Card
            </Button>
            <CreateCardModal App = {this}/>
          </div>
      );
    }
  }
}

export default App;
