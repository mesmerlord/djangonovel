import React from "react";
import { Link } from "react-router-dom";
import logo from "./final.png";
import axios from "axios";

export default class Header extends React.Component {
  state = {
    isActive: false,
    results: [],
    query: [],
    pushedQuery: "",
  };
  changeBurger = () => {
    this.setState({ isActive: !this.state.isActive });
    console.log("changed");
  };
  handleSearch = (e) => {
    this.setState({ pushedQuery: e.target.value });
    console.log(this.state.query);
    this.search(this.state.query);
  };
  search = () => {
    this.state.pushedQuery.length > 2
      ? axios
          .get(
            `http://127.0.0.1:8000/api/search/?search=${this.state.pushedQuery}`
          )
          .then((response) => {
            const rest = response.data.results;

            this.setState({ results: rest });
          })
      : console.log("No res");
  };
  render() {
    const resultsBox = this.state.results
      ? this.state.results.map((result) => (
          <a href={`/${result.slug}`} class="navbar-item">
            {result.name}
          </a>
        ))
      : console.log("no chaps");
    return (
      <>
        <nav
          class="navbar is-transparent is-fixed-top is-primary mb-6"
          role="navigation"
          aria-label="main navigation"
          style={{ outline: "1px" }}
        >
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src={logo} />
            </a>

            <a
              role="button"
              class={
                this.state.isActive
                  ? "navbar-burger is-active"
                  : "navbar-burger"
              }
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
              onClick={this.changeBurger}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbarBasicExample"
            class={
              this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
            }
          >
            <div class="navbar-start">
              <a class="navbar-item" href="/">
                Home
              </a>

              <a class="navbar-item">Documentation</a>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">More</a>

                <div class="navbar-dropdown">
                  <a class="navbar-item">About</a>
                  <a class="navbar-item">Jobs</a>
                  <a class="navbar-item">Contact</a>
                  <hr class="navbar-divider" />
                  <a class="navbar-item">Report an issue</a>
                </div>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <div class="navbar-item has-dropdown is-hoverable">
                    <div class="navbar-dropdown">
                      {resultsBox}
                      <a
                        className={
                          this.state.results.length > 2
                            ? "navbar-item is-hidden"
                            : "navbar-item"
                        }
                      >
                        Type 4 Letters To Start Searching
                      </a>
                    </div>
                    <input
                      placeholder="Search"
                      onChange={this.handleSearch}
                      class="input is-rounded"
                    />
                  </div>

                  {/* <a class="button is-light">Log in</a> */}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <br />
      </>
    );
  }
}
