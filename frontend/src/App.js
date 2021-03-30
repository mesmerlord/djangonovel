import React from 'react';
import NovelList from './frontpage.js';
import {Link, Switch,
        BrowserRouter as Router, Route } from 'react-router-dom'
import About from './about.js';
import NovelInfo from './novelinfo.js'

function App() {
  return (
    <div className="App">
      <Router>
      
      <Switch>
          <Route exact path="/">
            <NovelList/>
          </Route>
          <Route path="/about" component={About}/>
          <Route path = "/:id" component={NovelInfo}/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
