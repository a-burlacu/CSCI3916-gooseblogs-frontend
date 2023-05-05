import React from 'react';
import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <BlogpostHeader />
                        <Route exact path="/" render={()=><BlogpostList />}/>
                        <Route exact path="/blogpostlist" render={()=><BlogpostList />}/>
                        <Route exact path="/blogpost/:title" render={()=><Blogpost />}/>
                        <Route path="/signin" render={()=><Authentication />}/>
                    </div>
                </HashRouter>
            </Provider>
        </div>
    );
}

export default App;