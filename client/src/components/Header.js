import React from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';

class Header extends React.Component {
    CreateAdminLinksIfAllowed(){
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
        if(this.props.username === ""){
            localStorage.removeItem('jwt')
            //Refreshing here to avoid potential security flaws
            window.location.reload(false);
        }
        return (
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand href="#home">Project Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        {this.CreateAdminLinksIfAllowed()}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {/*TODO: Make this a link to a profile page later*/}
                        Signed in as: <span>{this.props.username} </span>
                    </Navbar.Text>
                    <Button className="ml-2" variant="secondary" onClick={() => this.logOff()}>Log Off</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;