import { Link } from 'react-router-dom';
import {Container, Nav, Navbar, Button, Form} from 'react-bootstrap';

const NavbarBS = () => {
    return ( 
        <Navbar expand="lg" className="bg-body-tertiary"
                bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">

                <img
                    src="/favicon.ico"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /> 
                    Simple Guide Tutorial</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link as={Link} to="/" >DashBoard</Nav.Link>
                    <Nav.Link as={Link} to="/admin">Admin DashBoard</Nav.Link>
                </Nav>


                <Form className="d-flex">
                    <Form.Control
                    type="text"
                    placeholder="Username"
                    className="me-2"
                    aria-label="Username"
                    />

                    <Form.Control
                    type="text"
                    placeholder="Password"
                    className="me-2"
                    aria-label="Password"
                    />
                    <Button variant="outline-success">Login</Button>
                </Form>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavbarBS;