import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Buttons(props) {
  const [chapterIndex, setChapterIndex] = useState(undefined);
  const [novelParentSlug, setnovelParentSlug] = useState();
  const [nextChapter, setnextChapter] = useState();
  useEffect(() => {
    setChapterIndex(props.props.chapterIndex);
    setnovelParentSlug(props.props.novelParentSlug);
    setnextChapter(props.props.nextChapter);
  }, [props]);
  return (
    <div className="columns" key={nextChapter}>
      <div className="column is-5 is-offset-5">
        <div className="buttons">
          <Link to={`/chapter/${novelParentSlug}-${chapterIndex - 1}`}>
            <button
              id="previousChapter"
              className="button is-link previousChapter"
              disabled={chapterIndex > 1 ? "" : "true"}
            >
              Previous Chapter
            </button>
          </Link>

          <hr />
          <div>
            <Link to={`/chapter/${novelParentSlug}-${chapterIndex + 1}`}>
              <button
                id="nextChapter"
                className="button is-link nextChapter"
                disabled={nextChapter ? "" : "true"}
              >
                Next Chapter
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
