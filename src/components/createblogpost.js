import React, { Component } from 'react';
import {createBlogpost} from "../actions/blogpostActions";
import {connect} from 'react-redux';
import {Form, Button } from 'react-bootstrap';
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

    render() {

        return (
            <Form className='form-horizontal'>
                <Form.Group controlId="title">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.title} type="text"
                                  placeholder="Enter title"/>
                </Form.Group>
                <Form.Group controlId="postBody">
                    <Form.Label>Body:</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.postBody} type="text"
                                  placeholder="Write post"/>
                </Form.Group>
                <Form.Group controlId="imageUrl">
                    <Form.Label>Enter Image URL:</Form.Label>
                    <Form.Control onChange={this.updateDetails} value={this.state.details.imageUrl} type="text"
                                  placeholder="Enter URL"/>
                </Form.Group>

                {console.log("title", this.state.details.title)}
                {console.log("username", this.state.details.username)}
                {console.log("postBody", this.state.details.postBody)}
                {console.log("imageUrl", this.state.details.imageUrl)}

                <Button onClick={this.submit}>Create Post</Button>
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