import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {logoutUser} from "../actions/authActions";

class BlogpostHeader extends Component {
    logout() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand>
                        GOOSE BLOGS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <LinkContainer to="/blogpostlist">
                                <Nav.Link disabled={!this.props.loggedIn}>Blogpost List</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/blogpost/' + (this.props.selectedBlogpost ? this.props.selectedBlogpost.title : '')}>
                                <Nav.Link disabled={!this.props.loggedIn}>Blogpost Detail</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signin">
                                <Nav.Link>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button> : 'Login'}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn : state.auth.loggedIn,
        username : state.auth.username,
        selectedBlogpost: state.blogpost.selectedBlogpost
    }
}

export default connect(mapStateToProps)(BlogpostHeader);