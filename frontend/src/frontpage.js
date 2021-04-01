import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default class NovelList extends React.Component {
  state = {
    novels1: [],
    currentPage: 0,
    loadButton: true,
  };
  headers = {
    "Content-Type": "application/json",
  };
  axiFetch = (pagenum) => {
    this.setState({ loadButton: true });
    axios
      .get(
        `http://127.0.0.1:8000/api/novels/?limit=10&offset=${pagenum * 10}`,
        { headers: this.headers }
      )
      .then((res) => {
        const novels = res.data.results;
        novels.map((newEl) =>
          this.setState({ novels1: [...this.state.novels1, newEl] })
        );
        this.setState({ currentPage: this.state.currentPage + 1 });
        this.setState({ loadButton: false });
      })

      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    console.log("mounted");
    this.axiFetch(this.state.currentPage);
    console.log(this.state.novels1);
  }

  render() {
    const buttonClick = () => {
      this.axiFetch(this.state.currentPage);
    };
    const categories = this.state.novels1
      ? this.state.novels1.map((category) =>
          category.author ? (
            <div
              key={category.name}
              className="card mx-auto mb-4"
              style={{ width: "13rem" }}
            >
              <img
                src={category.image}
                className="card-img-top"
                width="120"
                height="300"
              />

              <div class="card-body" style={{ marginRight: "20px" }}>
                <Link to={category.slug}>
                  <div>{category.name}</div>
                </Link>
                <div>{category.author["name"]}</div>
              </div>
            </div>
          ) : (
            console.log("Found")
          )
        )
      : "No news found";
    return (
      <>
        <div className="row">
          <div class="main-col col-md-8 col-sm-12">
            <div class="d-flex align-content-center flex-wrap">
              {categories}
            </div>
            <div className="row d-flexrow justify-content-center">
              <button
                className={
                  this.state.loadButton
                    ? "button is-link is-loading"
                    : "button is-link"
                }
                onClick={buttonClick}
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
