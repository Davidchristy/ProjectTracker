import React from 'react';
import axios from 'axios';
import {Button, Form} from "react-bootstrap";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedIn: false
        }
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
                if(res.status === 403){
                //    TODO: Pop up alert
                } else if(res.status === 200) {
                    localStorage.setItem('new-jwt', res.data)
                    this.setState({
                        loggedIn: true
                    });
                }
            });
    }

    render() {
        const jwt = localStorage.getItem('new-jwt')
        console.log(jwt)
        if(jwt){
            return (
                <div>Logged in!</div>
            )
        } else {
            return (
                <Form inline onSubmit={e => this.submit(e)}>
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
            );
        }
    }
}

export default Login