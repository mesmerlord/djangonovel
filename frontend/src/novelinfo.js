import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class NovelInfo extends React.Component {
  state = {
    novelInfo: Object,
    chapters: [],
    hasChaps: false,
    author: String,
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

  render() {
    const chapterBox = this.state.hasChaps ? (
      this.state.chapters.map((chapters) => (
        <Link to={`/chapter/${chapters.novSlugChapSlug}`}>
          <li key={chapters.index} className="p-2">
            {chapters.title}
          </li>
        </Link>
      ))
    ) : (
      <li>No Chapters found</li>
    );
    return (
      <div>
        <li>Slug - {this.state.novelInfo.slug}</li>
        <li>Author - {this.state.author}</li>
        <li>description - {this.state.novelInfo.description}</li>
        <img
          src={this.state.novelInfo["image"]}
          alt={this.state.novelInfo.name}
        />
        <li>linkNU - {this.state.novelInfo.linkNU}</li>
        <li>novelStatus - {String(this.state.novelInfo.novelStatus)}</li>
        <div className="card">
          <div className="d-flex flex-column justify-content-center">
            <div className="container">{chapterBox}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(NovelInfo);
