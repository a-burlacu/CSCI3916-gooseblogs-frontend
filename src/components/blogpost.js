import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { fetchBlogpost } from "../actions/blogpostActions";
import BlogpostDetail from "./blogpostdetail"

// support routing

function Blogpost(props) {
    const [selectedBlogpost] = useState(props.selectedBlogpost);
    const params = useParams();
    const title = params.title;
    console.log(title);
    const dispatch = useDispatch();
    if (selectedBlogpost == null) {
        dispatch(fetchBlogpost(title));
    }

    return (<BlogpostDetail title={title} />)
}

export default Blogpost;