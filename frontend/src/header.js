import React from "react";
import { Link } from "react-router-dom";
import logo from "./final.png";
import axios from "axios";
const apiHome = "http://127.0.0.1:8000/api";

export default class Header extends React.Component {
  state = {
    isActive: false,
    results: [],
    query: [],
    pushedQuery: "",
    isSearching: false,
  };
  changeBurger = () => {
    this.setState({ isActive: !this.state.isActive });
    console.log("changed");
  };
  handleSearch = (e) => {
    this.setState({ pushedQuery: e.target.value });

    this.search();
  };
  search = () => {
    this.state.pushedQuery.length > 2
      ? axios
          .get(`${apiHome}/search/?search=${this.state.pushedQuery}`)
          .then((response) => {
            const rest = response.data.results;
            this.setState({ isSearching: false });
            this.setState({ results: rest });
          })
      : console.log("No res");
  };
  render() {
    const resultsBox = this.state.results
      ? this.state.results.map((result) => (
          <Link to={`/${result.slug}`} class="navbar-item">
            {result.name}
          </Link>
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
            <Link class="navbar-item" to="/">
              <img src={logo} />
            </Link>

            <Link
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
            </Link>
          </div>

          <div
            id="navbarBasicExample"
            class={
              this.state.isActive ? "navbar-menu is-active" : "navbar-menu"
            }
          >
            <div class="navbar-start">
              <Link class="navbar-item" to="/">
                Home
              </Link>

              <Link to="/category/1" class="navbar-item">
                Action
              </Link>
              <Link to="/category/7" class="navbar-item">
                Xuanhuan
              </Link>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">More</a>

                <div class="navbar-dropdown">
                  <Link to="/category/1" class="navbar-item">
                    Action
                  </Link>
                  <Link to="/category/2" class="navbar-item">
                    Adventure
                  </Link>
                  <Link to="/category/4" class="navbar-item">
                    Fantasy
                  </Link>
                  <Link to="/category/5" class="navbar-item">
                    Harem
                  </Link>
                  <Link to="/category/12" class="navbar-item">
                    Romance
                  </Link>
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
