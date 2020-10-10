import React, { useState } from "react";
import { History } from "../../../../interfaces";

// components
import HomeTag from "./HomeTag";

const HomeTags = (props: { history: History }) => {
  const [tags] = useState([
    {
      title: "Κορυφαίες Πωλήσεις",
      paragraph:
        "Δείτε όλες τις κορυφαίες πωλήσεις μας και επιλέξτε τα προϊόντα που σας αρέσουν.",
      icon: "fas fa-chart-line",
      url: "/shop",
      setQueryTo: { page: 1, filter: "sold", sortBy: "DESC", category: "all" }
    },
    {
      title: "Προσφορές",
      paragraph:
        "Δείτε όλες προσφορές στα προϊόντα μας και εξοικονομείστε χρήματα μετις αγορές σας.",
      icon: "fas fa-piggy-bank",
      url: "/shop",
      setQueryTo: { page: 1, filter: "sale", sortBy: "ASC", category: "all" }
    },
    {
      title: "Νέα Προϊόντα",
      paragraph:
        "Δείτε όλα τα καινούργια προϊόντα μας και επιλέξτε τι σας αρέσει.",
      icon: "far fa-calendar-plus",
      url: "/shop",
      setQueryTo: {
        page: 1,
        filter: "created_at",
        sortBy: "DESC",
        category: "all"
      }
    }
  ]);

  return (
    <div className="home-tags">
      {tags.map((tag, i) => (
        <HomeTag
          key={i}
          title={tag.title}
          paragraph={tag.paragraph}
          icon={tag.icon}
          url={tag.url}
          setQueryTo={tag.setQueryTo}
          history={props.history}
        />
      ))}
    </div>
  );
};

export default HomeTags;
