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
import Footer from "./footer.js";
import Categories from "./categories.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path="/">
            <NovelList />
          </Route>
          <Route path="/about" component={About} />
          <Route path="/chapter/:id" component={ChapterView} />
          <Route path="/category/:category" component={Categories} />
          <Route path="/:id" component={NovelInfo} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
