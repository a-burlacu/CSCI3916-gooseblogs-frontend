import React, { Component } from 'react';
import {createBlogpost, fetchBlogpost, setBlogpost} from "../actions/blogpostActions";
import {connect} from 'react-redux';
import {Form, Button } from 'react-bootstrap';
import redirect from "react-router-dom/es/Redirect";
import {LinkContainer} from "react-router-bootstrap";
;
class CreateBlogpost extends Component {

    constructor(props) {
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            details: {
                title: '',
                username: localStorage.getItem('username'),
                postBody: '',
                imageUrl: ''
            }
        };
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    // componentDidMount() {
    //     const {dispatch} = this.props;
    //     if (this.props.selectedBlogpost == null) {
    //         dispatch(fetchBlogpost(this.props.title));
    //     }
    // }

    submit() {
        const {dispatch} = this.props;
        dispatch(createBlogpost(this.state.details));
    }
    handleClick = (blogpost) => {
        const {dispatch} = this.props;
        dispatch(fetchBlogpost(blogpost));
    }
    render() {

        return (
            <Form className='form-create'>
                <h1>Create New Post</h1>
                <Form.Group controlId="title">
                    <Form.Label className='label-create'>Title:</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.title} type="text"
                                  placeholder="Enter title"/>
                </Form.Group>
                <Form.Group controlId="postBody">
                    <Form.Label className='label-create'>Body:</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.postBody} type="text"
                                  placeholder="Write post"/>
                </Form.Group>
                <Form.Group controlId="imageUrl">
                    <Form.Label className='label-create'>Enter Image URL:</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.imageUrl} type="text"
                                  placeholder="Enter URL"/>
                </Form.Group>

                {console.log("title", this.state.details.title)}
                {console.log("username", this.state.details.username)}
                {console.log("postBody", this.state.details.postBody)}
                {console.log("imageUrl", this.state.details.imageUrl)}

                <LinkContainer to={'/blogpost/'+this.state.details.title} onClick={()=>this.handleClick(this.state.details.title)}>
                    <Button className="create-button" onClick={this.submit}>Create Post</Button>
                </LinkContainer>

            </Form>
        )


    }
}

const mapStateToProps = state => {
    return {
        blogpost: state.blogpost.blogpost
    }
}

export default connect(mapStateToProps)(CreateBlogpost);