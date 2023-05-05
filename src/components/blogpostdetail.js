import React, { Component } from 'react';
import { fetchBlogpost, submitComment } from "../actions/blogpostActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class BlogpostDetail extends Component {
    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.submit = this.submit.bind(this);
        // this.updateRating = this.updateRating.bind(this);
        this.state = {
            details:{
                blogpostTitle: this.props.selectedBlogpost.title,
                name: localStorage.getItem('username'),
                quote: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedBlogpost == null) {
            dispatch(fetchBlogpost(this.props.title));
        }
    }

    submit(){
        const {dispatch} = this.props;
        dispatch(submitComment(this.state.details));
    }

    // updateRating(rating){
    //     let updateDetails = Object.assign({}, this.state.details);
    //
    //     updateDetails.rating = rating.target.value;
    //     this.setState({
    //         details: updateDetails
    //     });
    // }

    render() {

        if (!this.props.selectedBlogpost) {
            return <div>Loading....</div>
        }

        return (
            <Card>
                <Card.Header>Blogpost Detail</Card.Header>
                <Card.Body>
                    <Image className="image" src={this.props.selectedBlogpost.imageURL} thumbnail />
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>{this.props.selectedBlogpost.title}</ListGroupItem>
                    <ListGroupItem>{this.props.selectedBlogpost.postBody}</ListGroupItem>
                    {/*<ListGroupItem>*/}
                    {/*    {this.props.selectedBlogpost?.actors?.map((actor, i) => {*/}
                    {/*        console.log(actor);*/}
                    {/*        return (<p key={i}>*/}
                    {/*            <b>{actor.actorName}</b> {actor.charName}*/}
                    {/*        </p>);*/}
                    {/*    })}*/}
                    {/*</ListGroupItem>*/}
                    {/*<ListGroupItem><h4><BsStarFill/> {this.props.selectedBlogpost.avgRating}</h4></ListGroupItem>*/}
                </ListGroup>
                <Card.Body>
                    {this.props.selectedBlogpost?.blogpostComments?.map((comment, i) =>
                        <p key={i}>
                            <b>{comment.name}</b>&nbsp; {comment.quote}
                            {/*&nbsp;  <BsStarFill /> {comment.rating}*/}
                        </p>
                    )}
                    <Form className='form-horizontal'>
                        <Form.Group controlId="quote">
                            <Form.Label>Leave a Comment:</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.quote} type="text" placeholder="Comment" />
                        </Form.Group>

                        {/*<Form.Group controlId="rating">*/}
                        {/*    <div key={'inline-radio'}>*/}
                        {/*        <Form.Label> Rate the Movie: &nbsp;*/}
                        {/*            <Form.Check onChange={this.updateRating} inline label="1" name="rating" type="radio" value={1}/>*/}
                        {/*            <Form.Check onChange={this.updateRating} inline label="2" name="rating" type="radio" value={2}/>*/}
                        {/*            <Form.Check onChange={this.updateRating} inline label="3" name="rating" type="radio" value={3}/>*/}
                        {/*            <Form.Check onChange={this.updateRating} inline label="4" name="rating" type="radio" value={4}/>*/}
                        {/*            <Form.Check onChange={this.updateRating} inline label="5" name="rating" type="radio" value={5}/>*/}
                        {/*            Stars </Form.Label>*/}
                        {/*    </div>*/}
                        {/*</Form.Group>*/}
                        {console.log("blogpost", this.state.details.blogpostTitle)}
                        {console.log("username", this.state.details.username)}
                        {console.log("quote", this.state.details.quote)}

                        <Button onClick={this.submit}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedBlogpost: state.blogpost.selectedBlogpost
    }
}

export default connect(mapStateToProps)(BlogpostDetail);