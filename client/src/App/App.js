import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer } from './components';
import { Home, RecipeBook, CreateRecipe, Search, RecipeListing } from './pages';

import './App.css';

function App() {
    const [hasSessionId, setSessionId] = useState("")

    console.log("cookie", document.cookie)

    function hasSession() {
        console.log(document.cookie.sessionId)
        if (document.cookie.sessionId) {
            setSessionId(true)
        } else {
            setSessionId(false)
        }
    }

    return (
        <div className="App">
            <Router>
                <Header />
                <Switch>
                <Route exact path ='/' component={Home} />
                <Route exact path ='/recipe-book' component={RecipeBook} />
                <Route exact path ='/create-recipe' component={CreateRecipe} />
                <Route exact path ='/search' component={Search} />
                <Route exact path ='/recipe/:recipeId' component={RecipeListing} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
