import React from "react";
import { ProductComment, State } from "../../../../interfaces";
import { connect } from "react-redux";
import { deleteComment } from "../../../../actions/product";

const Comment = (props: {
  comment: ProductComment;
  isAuthenticated: boolean;
  userId: string;
  token: string;
  deleteComment: Function;
}) => {

  return (
    <div className="comment">
      <div className="user">
        <div className="name">
          <span>{props.comment.user}</span>
        </div>

        {props.comment.rate > 0 && (
          <div className="rate">
            {[1, 2, 3, 4, 5].map((r, i) => (
              <i
                className="fas fa-star"
                style={
                  r <= props.comment.rate
                    ? { color: "yellow" }
                    : { color: "#ccc" }
                }
                key={i}
              ></i>
            ))}
          </div>
        )}
      </div>

      <p>
        {props.comment.comment}
        {props.isAuthenticated && props.userId === props.comment.user_id && (
          <span
            className="remove-comment"
            onClick={() =>
              props.deleteComment(props.userId, props.token, props.comment.id)
            }
          >
            <i className="far fa-window-close"></i>
          </span>
        )}
      </p>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.isAuthenticated,
  userId: state.user.user.id,
  token: state.user.token
});

export default connect(mapStateToProps, { deleteComment })(Comment);
