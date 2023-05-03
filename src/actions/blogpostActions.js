import actionTypes from '../constants/actionTypes';

const env = process.env;

function blogpostsFetched(blogposts) {
    return {
        type: actionTypes.FETCH_BLOGPOSTS,
        movies: blogposts
    }
}

function blogpostFetched(blogpost) {
    return {
        type: actionTypes.FETCH_BLOGPOST,
        selectedMovie: blogpost
    }
}

function blogpostSet(blogpost) {
    return {
        type: actionTypes.SET_BLOGPOST,
        selectedMovie: blogpost
    }
}

export function commentSet(comment) {
    return {
        type: actionTypes.SET_COMMENT,
        review: comment
    }
}

export function setBlogpost(blogpost) {
    return dispatch => {
        dispatch(blogpostSet(blogpost));
    }
}


export function fetchBlogpost(blogpostID) {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${blogpostID}?comments=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            //console.log("response.json", response.json());
            return response.json()
        }).then((res) => {
            dispatch(blogpostFetched(res[0]));
        }).catch((e) => console.log(e));
    }
}

export function fetchBlogposts() {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/blogposts?comments=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        }).then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            dispatch(blogpostFetched(res));
        }).catch((e) => console.log(e));
    }
}

export function submitComment(data) {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/comment`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }).then((response) => {
            console.log("response", response);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json()
        }).then((res) => {
            console.log("response", res);
            dispatch(commentSet(res));
            localStorage.setItem('blogpostID', data.blogpostID);
            localStorage.setItem('username', data.username);
            localStorage.setItem('quote', data.quote);
            dispatch(fetchBlogpost(data.blogpostID));
        }).catch((e) => console.log(e));
    }
}