import React from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import DisqusComments from "./comments.js";
import Buttons from "./buttons.js";

const apiHome = "http://127.0.0.1:8000/api";

class ChapterView extends React.Component {
  state = {
    chapterText: "",
    chapterName: "",
    novelParent: "",
    nextChapter: true,
    chapterIndex: Number,
    novelParentSlug: "",
    textSize: JSON.parse(localStorage.getItem("fontSize")) || 19,
    loading: true,
  };

  headers = { "Content-Type": "application/json" };
  chapterFetch = (chapterSlug) => {
    axios
      .get(`${apiHome}/getchapter/${chapterSlug}/`, {
        headers: this.headers,
      })
      .then((response) => {
        const res = response.data;
        this.setState({
          chapterText: res.text,
          chapterName: res.title,
          nextChapter: res.nextChap,
          chapterIndex: res.index,
          novelParent: res.novelParentName,
          novelParentSlug: res.novelParent,
          loading: false,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    document.title = "Loading - PirateNovel";
    const id = this.props.match.params.id;
    this.chapterFetch(id);

    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentDidUpdate(prevProp) {
    const currentid = this.props.match.params.id;
    if (currentid !== prevProp.match.params.id) {
      this.chapterFetch(currentid);
    }
  }
  nextChapter() {
    document.getElementById("nextChapter").click();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
  previousChapter() {
    document.getElementById("previousChapter").click();
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  handleKeyPress = (event) => {
    event.keyCode === 37 && this.state.nextChapter
      ? this.previousChapter()
      : event.keyCode === 39 && this.state.chapterIndex > 1
      ? this.nextChapter()
      : console.log("none");
    this.setState(this.state);
  };
  saveToStorage = () => {
    localStorage.setItem("fontSize", JSON.stringify(this.state.textSize));
  };

  addText = () => {
    this.setState({ textSize: this.state.textSize + 1 });
    this.saveToStorage();
  };
  smallText = () => {
    this.state.textSize > 14
      ? this.setState({ textSize: this.state.textSize - 1 })
      : console.log("max");
    this.saveToStorage();
  };

  render() {
    document.title = this.state.chapterName;

    return (
      <>
        <div
          className={
            this.state.loading
              ? "loaders-container"
              : "loaders-container is-hidden"
          }
        >
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className={!this.state.loading ? "box" : "box is-hidden"}>
          <div className="columns is-vcentered justify-content-center">
            <div className="column is-centered">
              <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to={`/${this.state.novelParentSlug}`}>
                      {this.state.novelParent}
                    </Link>
                  </li>

                  <li class="is-active">
                    <Link
                      to={`/chapter/${this.state.novelParentSlug}-${this.state.chapterIndex}`}
                      aria-current="page"
                    >
                      {this.state.chapterName}
                    </Link>
                  </li>
                </ul>
              </nav>
              <h2 className="title">{this.state.chapterName}</h2>
              <Buttons key={this.state.chapterIndex} props={this.state} />
              <button onClick={this.addText} className="button is-link">
                +
              </button>
              <button onClick={this.smallText} className="button is-link">
                -
              </button>
            </div>
          </div>
          <div
            style={{ fontSize: this.state.textSize }}
            className="container chapter-box"
            dangerouslySetInnerHTML={{
              __html: this.state.chapterText,
            }}
          ></div>
          <br />
          <Buttons key={this.state.chapterIndex} props={this.state} />
          <br />
        </div>
        <br />
        {/* {!this.state.loading ? (
          <DisqusComments
            slug={`${this.state.novelParentSlug}-${this.state.chapterIndex}`}
            title={this.state.chapterName}
          />
        ) : (
          <div />
        )} */}
      </>
    );
  }
}
export default withRouter(ChapterView);
