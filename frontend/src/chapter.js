import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import DisqusComments from "./comments.js";

class ChapterView extends React.Component {
  state = {
    chapterText: "",
    chapterName: "",
    novelParent: "",
    nextChapter: true,
    chapterIndex: Number,
    novelParentSlug: "",
    textSize: JSON.parse(localStorage.getItem("fontSize")) || 19,
    lastChapter: "",
    getNextChapter: "",
    loading: true,
  };

  headers = { "Content-Type": "application/json" };
  chapterFetch = (chapterSlug) => {
    axios
      .get(`http://127.0.0.1:8000/api/getchapter/${chapterSlug}/`, {
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
          lastChapter: `/chapter/${res.novelParent}-${res.index - 1}`,
          getNextChapter: `/chapter/${res.novelParent}-${res.index + 1}`,
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
  nextChapter() {
    document.getElementById("nextChapter").click();
  }
  previousChapter() {
    document.getElementById("previousChapter").click();
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
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href={`/${this.state.novelParentSlug}`}>
                      {this.state.novelParent}
                    </a>
                  </li>

                  <li class="is-active">
                    <a
                      href={`/chapter/${this.state.novelParentSlug}-${this.state.chapterIndex}`}
                      aria-current="page"
                    >
                      {this.state.chapterName}
                    </a>
                  </li>
                </ul>
              </nav>
              <h2 className="title">{this.state.chapterName}</h2>
              <div className="columns">
                <div className="column is-5 is-offset-5">
                  <div className="buttons">
                    <a
                      href={`/chapter/${this.state.novelParentSlug}-${
                        this.state.chapterIndex - 1
                      }`}
                    >
                      <button
                        id="previousChapter"
                        className="button is-link previousChapter"
                        disabled={this.state.chapterIndex > 1 ? "" : "true"}
                      >
                        Previous Chapter
                      </button>
                    </a>

                    <hr />
                    <div>
                      <a
                        href={`/chapter/${this.state.novelParentSlug}-${
                          this.state.chapterIndex + 1
                        }`}
                      >
                        <button
                          id="nextChapter"
                          className="button is-link nextChapter"
                          disabled={this.state.nextChapter ? "" : "true"}
                        >
                          Next Chapter
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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

          <div className="columns">
            <div className="column is-5 is-offset-5">
              <div className="buttons">
                <a
                  href={`/chapter/${this.state.novelParentSlug}-${
                    this.state.chapterIndex - 1
                  }`}
                >
                  <button
                    id="previousChapter"
                    className="button is-link previousChapter"
                    disabled={this.state.chapterIndex > 1 ? "" : "true"}
                  >
                    Previous Chapter
                  </button>
                </a>

                <hr />
                <div>
                  <a
                    href={`/chapter/${this.state.novelParentSlug}-${
                      this.state.chapterIndex + 1
                    }`}
                  >
                    <button
                      id="nextChapter"
                      className="button is-link nextChapter"
                      disabled={this.state.nextChapter ? "" : "true"}
                    >
                      Next Chapter
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <br />
        <DisqusComments
          slug={`${this.state.novelParentSlug}-${this.state.chapterIndex}`}
          title={this.state.chapterName}
        />
      </>
    );
  }
}
export default withRouter(ChapterView);
