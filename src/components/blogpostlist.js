import React, { Component } from 'react';
import { fetchBlogposts } from "../actions/blogpostActions";
import { setBlogpost } from "../actions/blogpostActions";
import {connect} from 'react-redux';
import {Image, Nav} from 'react-bootstrap';
import { Carousel } from 'react-bootstrap';
import { BsStarFill} from 'react-icons/bs'
import {LinkContainer} from 'react-router-bootstrap';

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
        const BlogpostListCarousel = ({blogpostList}) => {
            if (!blogpostList) {
                return <div>Loading....</div>
            }

            return (
                <Carousel onSelect={this.handleSelect} >
                    {blogpostList.map((blogpost) =>
                        <Carousel.Item key={blogpost.title}>
                            <div>
                                <LinkContainer to={'/blogpost/'+blogpost.title} onClick={()=>this.handleClick(blogpost)}>
                                    <Nav.Link><Image className="image" src={blogpost.imageUrl} thumbnail/></Nav.Link>
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                <h3>{blogpost.title}</h3> &nbsp;&nbsp; <p>Author: {blogpost.username}</p>
                                {/*<BsStarFill glyph={'star'} /> {blogpost.avgRating} &nbsp;&nbsp; {blogpost.releaseDate}*/}
                            </Carousel.Caption>
                        </Carousel.Item>
                    )}

                </Carousel>
            )
        }

        return (
            <BlogpostListCarousel blogpostList={this.props.blogposts} />
        )
    }
}

const mapStateToProps = state => {
    return {
        blogposts: state.blogpost.blogposts
    }
}

export default connect(mapStateToProps)(BlogpostList);