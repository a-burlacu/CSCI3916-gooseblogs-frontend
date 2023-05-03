import React from 'react';
import './App.css';
import BlogpostHeader from './components/blogpostheader';
import BlogpostList from './components/blogpostlist';
import Blogpost from './components/blogpost';
import Authentication from './components/authentication';
import {HashRouter, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
// import BlogpostList from "./components/blogpostlist";
// import BlogpostHeader from "./components/blogpostheader";

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