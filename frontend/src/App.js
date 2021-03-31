import React from "react";
import NovelList from "./frontpage.js";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import About from "./about.js";
import NovelInfo from "./novelinfo.js";
import "bulma/sass/base/_all.sass";
import "bulma/css/bulma.min.css";
import Header from "./header.js";
import "./App.css";
import ChapterView from "./chapter.js";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <NovelList />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/chapter/:id" component={ChapterView} />
          <Route path="/:id" component={NovelInfo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
