import React from 'react';
import axios from 'axios';
import {Button, Form, Jumbotron, Modal, Alert} from "react-bootstrap";


type MyProps = {
    //TODO: This props shouldn't be any, but it's a quick fix to work
    App: any
};
type MyState = {
    email: string,
    username: string,
    password: string,
    showErrorModal: boolean,
    showCreateAccountModal: boolean,
    showAccountCreationError: boolean,
    accountCreationErrorText: string,
    showAccountCreationSuccess: boolean
    };
class Login extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            username: '',
            //TODO: Don't store this password in clear text, save the salt of it
            password: '',
            showErrorModal: false,
            showCreateAccountModal: false,
            showAccountCreationError: false,
            accountCreationErrorText: "",
            showAccountCreationSuccess: false
        }
    }

    handleCreateAccountModalClose(){
        this.setState({
            showCreateAccountModal: false
        });
    }
    handleCreateAccountModalShow(){
        this.setState({
            showCreateAccountModal: true
        });
    }

    handleErrorModalClose(){
        this.setState({
            showErrorModal: false
        });
    }
    handleErrorModalShow(){
        this.setState({
            showErrorModal: true
        });
    }

    changeInForm(name: string, value: string){
        this.setState((current) => ({...current,
            [name] : value
        }));
    }


    submitLogIn(e: React.FormEvent<HTMLElement>){
        e.preventDefault();
        //TODO: Uses "then" should look into using async/await
        axios.post('http://localhost:9000/auth/login',{
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if(res.status === 200) {
                localStorage.setItem('jwt', res.data.accessToken)
                this.props.App.handleUserLogin.bind(this.props.App)({
                    //TODO: Standardize if I'm using email, or username
                    username:res.data.email,
                    userRole: res.data.role
                })
            }
        }).catch(error => {
            if(error.response && error.response.status === 403){
                this.handleErrorModalShow();
            }
        });
    }

    submitCreateAccount(e: React.FormEvent<HTMLElement>){
        e.preventDefault()
        axios.put('http://localhost:9000/auth/createAccount',{
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            if(res.status === 200) {
                //    Close modal and let user log in under new log
                //    TODO: Make an boot strap alert on page letting them know user creation worked
                this.setState({
                    showCreateAccountModal: false,
                    showAccountCreationSuccess: true
                })

            }
        }).catch(error => {
            if(error.response && error.response.status === 409){
                //    TODO: Add a "forgot password" button
                this.setState({
                    showAccountCreationError: true,
                    accountCreationErrorText: error.response.data
                })
            }
        });

    }

    render() {
        return (
            <div style={{height: '100vh',
                backgroundColor: "#a1f9ff"}}>
                {/*TODO: Make this into a CSS class and assign it there instead of here*/}
                <div style={{  margin: '0',
                    position: 'absolute',
                    top: 50+'%',
                    left: 50+'%',
                    transform: 'translate(-50%, -50%)'}}>

                    {/*TODO: I took to long getting this working, but spend a bit more time making the colors look like an error*/}
                    {/*TODO: Both modals might be moved to a new component file each*/}
                    <Modal
                        show={this.state.showErrorModal}
                        backdrop="static"
                        variant="error">
                        <Modal.Header closeButton onClick={this.handleErrorModalClose.bind(this)}>
                            <Modal.Title>Incorrect Username/Password</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Please try again or create an account below</Modal.Body>
                        <Modal.Footer>
                            {/*TODO: This Create Account button isn't working*/}
                            <Button variant="secondary" onClick={this.handleErrorModalClose.bind(this)}>
                                Create Account
                            </Button>
                            <Button variant="warning" onClick={this.handleErrorModalClose.bind(this)}>
                                Try Again
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={this.state.showCreateAccountModal}
                        backdrop="static">
                        <Modal.Header closeButton onClick={this.handleCreateAccountModalClose.bind(this)}>
                            <Modal.Title>Create Account</Modal.Title>
                        </Modal.Header>
                        {/*TODO: Do some sort of form validation before sending to server*/}
                        <Form onSubmit={e => this.submitCreateAccount(e)}>
                            <Modal.Body>

                                <Alert variant="danger"
                                       show={this.state.showAccountCreationError}
                                       dismissible
                                       onClose={() => {this.setState({
                                           showAccountCreationError: false
                                       })}}>
                                    {this.state.accountCreationErrorText}
                                </Alert>
                                <Form.Label className="sr-only" htmlFor="accountCreationFormInputEmail">
                                    Email
                                </Form.Label>
                                <span>Email:</span>
                                <Form.Control name="email"
                                              type="text"
                                              className="form-control mb-2 mr-sm-2"
                                              id="accountCreationFormInputEmail"
                                              placeholder="First.Last@email.com"
                                              onChange={e => {
                                                  this.changeInForm(e.target.name, e.target.value);
                                              }}/>

                                <Form.Label className="sr-only" htmlFor="accountCreationFormInputUsername">
                                    Username
                                </Form.Label>
                                <span>Username:</span>
                                <Form.Control name="username"
                                              type="text"
                                              className="form-control mb-2 mr-sm-2"
                                              id="accountCreationFormInputUsername"
                                              placeholder="Username"
                                              onChange={e => {
                                                  this.changeInForm(e.target.name, e.target.value);
                                              }}/>

                                <Form.Label className="sr-only" htmlFor="accountCreationFormInputPassword">
                                    Password
                                </Form.Label>
                                <span>Password:</span>
                                <Form.Control name="password"
                                              type="password"
                                              className="form-control mb-2 mr-sm-2"
                                              id="accountCreationFormInputPassword"
                                              placeholder="Password"
                                              onChange={e => {
                                                  this.changeInForm(e.target.name, e.target.value);
                                              }}/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                                <Button variant="secondary" onClick={this.handleCreateAccountModalClose.bind(this)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>


                    <Jumbotron className="bg-info">
                        <Alert
                            variant="success"
                            show={this.state.showAccountCreationSuccess}>
                            Account Successfully created!
                        </Alert>
                        <h1>Sign In:</h1>
                        <Form onSubmit={e => this.submitLogIn(e)}>
                            <Form.Label className="sr-only" htmlFor="loginFormInputEmail">
                                Email
                            </Form.Label>
                            <Form.Control name="email"
                                          type="text"
                                          className="form-control mb-2 mr-sm-2"
                                          id="loginFormInputEmail"
                                          placeholder="Email"
                                          onChange={e => {
                                              this.changeInForm(e.target.name, e.target.value);
                                          }}/>

                            <Form.Label className="sr-only" htmlFor="loginFormInputPassword">
                                Username
                            </Form.Label>
                            <Form.Control name="password"
                                          type="password"
                                          className="form-control mb-2 mr-sm-2"
                                          id="loginFormInputPassword"
                                          placeholder="Password"
                                          onChange={e => {
                                              this.changeInForm(e.target.name, e.target.value);
                                          }}/>

                            <Button variant="primary" type="submit" className="btn btn-primary mb-2">
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={this.handleCreateAccountModalShow.bind(this)} className="btn btn-primary mb-2 ml-5">
                                Create Account
                            </Button>
                        </Form>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

export default Login