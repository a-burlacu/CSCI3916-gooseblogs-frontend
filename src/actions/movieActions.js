import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env'
import blogpost from "../components/blogpost";
const env = process.env;

function blogpostsFetched(blogposts) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movies
    }
}

function blogpostFetched(blogpost) {
    return {
        type: actionTypes.FETCH_BLOGPOST,
        selectedBlogpost: blogpost
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function commentSet(comment) {
    return {
        type: actionTypes.SET_COMMENT,
        comment: comment
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie));
    }
}


export function fetchBlogpost(title) {

    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieID}?reviews=true`, {
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
        return fetch(`${env.REACT_APP_API_URL}/movies?reviews=true`, {
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
            dispatch(blogpostsFetched(res));
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
            localStorage.setItem('blogpostTitle', data.blogpostTitle);
            localStorage.setItem('username', data.username);
            localStorage.setItem('quote', data.quote);
            dispatch(fetchBlogpost(data.blogpostTitle));
        }).catch((e) => console.log(e));
    }
}