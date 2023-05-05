import React, { Component } from 'react';
import {fetchBlogposts} from "../actions/blogpostActions";
import { setBlogpost } from "../actions/blogpostActions";
import {connect} from 'react-redux';
import {Button, Card, Image, Nav} from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap';
import blogpost from "./blogpost";

class BlogpostList extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchBlogposts());
    }

    handleSelect(selectedIndex, e) {
        const {dispatch} = this.props;
        dispatch(setBlogpost(this.props.blogposts[selectedIndex]));
    }

    handleClick = (blogpost) => {
        const {dispatch} = this.props;
        dispatch(setBlogpost(blogpost));
    }


    render() {
        if (!this.props.blogposts) {
            return <div>Loading....</div>
           }
        return(
            <Card>
                <Card.Img variant={"top"} src={this.props.selectedBlogpost.imageURL} thumbnail />
                <Card.Body>
                    {this.props.selectedBlogpost?.blogposts?.map((post, i) =>{

                        }
                    )}
                </Card.Body>
            </Card>
        )
        const BlogpostListCard = (blogpost, index) => {
            return (
                <Card style={{width: '18rem'}} key={index}>
                    <Card.Img variant="top" src={blogpost.imageURL}/>,
                    <Card.Body>
                        <Card.Title>{blogpost.title}</Card.Title>
                        <Card.Text>{blogpost.username}</Card.Text>
                        <Button variant={"primary"} onClick={() => this.handleClick(blogpost)}>View Post</Button>
                    </Card.Body>
                </Card>
            );
        };
    }
}

const mapStateToProps = state => {
    return {
        blogposts: state.blogpost.blogposts
    }
}

export default connect(mapStateToProps)(BlogpostList);