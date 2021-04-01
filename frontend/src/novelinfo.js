import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import DisqusComments from "./comments.js";

class NovelInfo extends React.Component {
  state = {
    novelInfo: Object,
    chapters: [],
    hasChaps: false,
    author: String,
    chapterToShow: 10,
    loadButton: true,
  };
  redirectHome() {
    this.props.history.push("/");
  }
  headers = { "Content-Type": "application/json" };
  novelFetch = (slug) => {
    const link = `http://127.0.0.1:8000/api/novels/${slug}/`;
    console.log(link);
    axios
      .get(link, { headers: this.headers })
      .then((response) => {
        console.log(response.data);
        const res = response.data;
        const author = () => {
          res.author
            ? this.setState({ author: res.author.name })
            : console.log("none");
        };
        author();
        this.setState({ novelInfo: res });
      })
      .catch((err) => {
        console.log(err);
        this.redirectHome();
        this.setState({ novelInfo: [] });
      });
  };
  chapterFetch = (slug) => {
    axios
      .get(`http://127.0.0.1:8000/api/chapters/${slug}/`, {
        headers: this.headers,
      })
      .then((response) => {
        const res = response.data;
        console.log(response.status);
        res.map((newEl) =>
          this.setState({ chapters: [...this.state.chapters, newEl] })
        );
        this.setState({ hasChaps: true });
        this.setState({ loadButton: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.novelFetch(id);
    this.chapterFetch(id);
    console.log(this.state.novelInfo.id);
  }
  loadMoreButton = () => {
    this.setState({ loadButton: true });
    this.setState({ chapterToShow: this.state.chapterToShow + 10 });
    this.setState({ loadButton: false });
  };
  render() {
    const chapterBox = this.state.hasChaps ? (
      this.state.chapters.slice(0, this.state.chapterToShow).map((chapters) => (
        <Link to={`/chapter/${chapters.novSlugChapSlug}`}>
          <p key={chapters.index} className="p-2">
            {chapters.title}
          </p>
        </Link>
      ))
    ) : (
      <p className="p-2">{this.state.loadButton ? "Loading" : "No Chapters"}</p>
    );
    const categories = this.state.novelInfo.category ? (
      this.state.novelInfo.category.map((item) => (
        <a key={item.id} href={`/category/${item.id}`}>
          {item.name} &nbsp;
        </a>
      ))
    ) : (
      <a>{this.state.loadButton ? "Loading" : ""}</a>
    );

    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <div class=" col align-self-center">
              <img
                src={this.state.novelInfo["image"]}
                alt={this.state.novelInfo.name}
                class="rounded mx-auto d-block"
                width="200"
              />
            </div>
            <div className="container">
              <h2 class="text-center title is-3">
                {this.state.novelInfo.name}
              </h2>
            </div>
            <br />
            <h4 class="text-center">
              Number of Chapters - {this.state.novelInfo.numOfChaps}
            </h4>
            <h4 class="text-center">Views - {this.state.novelInfo.views}</h4>
            <div class="d-flex justify-content-center mt-4">
              <h4 className="title is-5">Category - {categories}</h4>
            </div>
            <br />
            <h2 class="text-center title is-4">Author - {this.state.author}</h2>
            <br />
            <p class="large" style={{ fontSize: "1.2em" }}>
              {this.state.novelInfo.description}
            </p>
            {/* <h2 class="text-center title is-4">
              linkNU - {this.state.novelInfo.linkNU}
            </h2>
            <h2 class="text-center title is-4">
              novelStatus - {String(this.state.novelInfo.novelStatus)}
            </h2> */}
          </div>
        </div>

        <br />

        <div class="container chapterbox">
          <div class="col card" style={{ width: "40rem" }}>
            <h3 class="title is-4 text-center">Chapters</h3>
            <div class="row justify-content-md-center">
              <div className="container">{chapterBox}</div>
              <br />
            </div>
            <button
              class={
                this.state.loadButton
                  ? "button is-link is-loading"
                  : "button is-link"
              }
              onClick={this.loadMoreButton}
            >
              Load More
            </button>
          </div>
        </div>
        <DisqusComments
          slug={`${this.state.novelInfo.slug}`}
          title={this.state.novelInfo.title}
        />
      </div>
    );
  }
}
export default withRouter(NovelInfo);
