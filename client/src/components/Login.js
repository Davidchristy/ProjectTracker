import React from 'react';
import axios from 'axios';
import {Button, Form, Jumbotron, Modal} from "react-bootstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showModal: false,
        }


    }
    handleClose(){
        this.setState({
            showModal: false
        });
    }
    handleShow(){
        this.setState({
            showModal: true
        });
    }

    change(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }


    submit(e){
        e.preventDefault();
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
            if(error.response.status === 403){
                this.handleShow();
            }

        });
    }

    render() {
        const jwt = localStorage.getItem('jwt')



        if(jwt){
            return ("Nothing")
        } else {
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
                        <Modal
                            show={this.state.showModal}
                            backdrop="static"
                            variant="error">
                            <Modal.Header closeButton onClick={this.handleClose.bind(this)}>
                                <Modal.Title>Incorrect Username/Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Please try again for create an account below</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                    Create Account
                                </Button>
                                <Button variant="warning" onClick={this.handleClose.bind(this)}>
                                    Try Again
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        <Jumbotron className="bg-info">
                            <h1>Sign In:</h1>
                            <Form onSubmit={e => this.submit(e)}>
                                <Form.Label className="sr-only" htmlFor="loginFormInputEmail">
                                    Email
                                </Form.Label>
                                <Form.Control name="email"
                                              type="text"
                                              className="form-control mb-2 mr-sm-2"
                                              id="loginFormInputEmail"
                                              placeholder="First.Last@email.com"
                                              onChange={e => this.change(e)}/>

                                <Form.Label className="sr-only" htmlFor="inlineFormInputPassword">
                                    Username
                                </Form.Label>
                                <Form.Control name="password"
                                              type="password"
                                              className="form-control mb-2 mr-sm-2"
                                              id="inlineFormInputPassword"
                                              placeholder="Password"
                                              onChange={e => this.change(e)}/>

                                <Button variant="secondary" type="submit" className="btn btn-primary mb-2">
                                    Submit
                                </Button>
                            </Form>
                        </Jumbotron>
                    </div>
                </div>
            );
        }
    }
}

export default Login