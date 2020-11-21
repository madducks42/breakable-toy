import React from "react";
import { Link } from "react-router-dom";

const UserReviewTile = (props) => {
  // debugger;
  return (
    <div className="callout">
      <h2>
        <Link
          className="campround-link"
          to={`/campgrounds/${props.campgroundID}`}
        >
          {props.campgroundName}
        </Link>
      </h2>
      <div className="callout">
        <h4>{props.title}</h4>
        <p>{props.body}</p>
        Rating: {props.rating}
      </div>
    </div>
  );
};

export default UserReviewTile;