import { DiscussionEmbed } from "disqus-react";
import React from "react";

const DisqusComments = ({ slug, title }) => {
  const disqusShortname = "piratenovels";
  const disqusConfig = {
    url: "https://piratenovel.com",
    identifier: slug, // Single post id
    title: title, // Single post title
  };
  return (
    <div className="box">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default DisqusComments;
