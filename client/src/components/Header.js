import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';

class Header extends React.Component {
    generateAdminLinks(){
        if (this.props.role === "admin"){
            return (<Nav.Link href="#admin">Admin</Nav.Link>)}
        else{
            return ''
        }
    }

    logOff(){
        localStorage.removeItem('jwt')
        //Refreshing here to avoid potential security flaws
        window.location.reload(false);
    }
    render() {
        return (
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        {this.generateAdminLinks()}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {/*TODO: Make this a link to a profile page later*/}
                        Signed in as: <span>{this.props.username}</span>
                    </Navbar.Text>
                    <Button variant="secondary" onClick={() => this.logOff()}>Log Off</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;