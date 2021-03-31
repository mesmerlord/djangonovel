import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class ChapterView extends React.Component {
  state = {
    chapterText: String,
    chapterName: String,
    novelParent: String,
    nextChapter: true,
    chapterIndex: Number,
    novelParentSlug: String,
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
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    const id = this.props.match.params.id;
    this.chapterFetch(id);
  }

  render() {
    return (
      <>
        <div className="box">
          <div className="columns is-vcentered justify-content-center">
            <div className="column is-centered">
              <h1 className="title ">{this.state.chapterName}</h1>
              <a href={`/${this.state.novelParentSlug}`}>
                <h2 className="title">{this.state.novelParent}</h2>
              </a>
            </div>
          </div>
          <div
            className="container chapter-box"
            dangerouslySetInnerHTML={{
              __html: this.state.chapterText,
            }}
          ></div>
          <div className="columns">
            <div className="column is-centered">
              <a
                href={`/chapter/${this.state.novelParentSlug}-${
                  this.state.chapterIndex - 1
                }`}
              >
                <button
                  className="button is-link"
                  disabled={this.state.chapterIndex > 1 ? "" : "true"}
                >
                  Previous Chapter
                </button>
              </a>
            </div>
            <div className="chapButtonDivider"></div>
            <div>
              <a
                href={`/chapter/${this.state.novelParentSlug}-${
                  this.state.chapterIndex + 1
                }`}
              >
                <button
                  className="button is-link"
                  disabled={this.state.nextChapter ? "" : "true"}
                >
                  Next Chapter
                </button>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(ChapterView);
