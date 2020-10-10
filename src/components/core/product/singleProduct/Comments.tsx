import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { State, ProductComment, History } from "../../../../interfaces";
import { commentOnProduct } from "../../../../actions/product";

// Components
import Comment from "./Comment";

const Comments = (props: {
  comments: ProductComment[];
  commentOnProduct: Function;
  isAuthenticated: boolean;
  token: string;
  userId: string;
  history: History;
  productId: string;
}) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([] as ProductComment[]);

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments]);

  return (
    <div className="comments">
      <h4>
        Σχόλια <i className="fas fa-comments"></i>
      </h4>

      <textarea
        className="leave-comment"
        placeholder="Αφήστε ένα σχόλιο"
        value={comment}
        onChange={e => setComment(e.target.value)}
        onFocus={() => {
          if (!props.isAuthenticated) {
            props.history.push("/signin");
          }
        }}
      ></textarea>

      {comment.length > 0 && (
        <div className="buttons">
          <button
            className="done btn"
            onClick={() => {
              props.commentOnProduct(
                props.userId,
                props.token,
                props.productId,
                comment
              );

              setComment("");
            }}
          >
            Τέλος
          </button>
          <button className="cancel btn">Ακύρωση</button>
        </div>
      )}

      <div className="comments-list">
        {comments.length === 0 && <p className="no-comments">0 Σχόλια</p>}

        {comments.length > 0 &&
          comments.map((c, i) => <Comment comment={c} key={i} />)}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  comments: state.product.productComments,
  isAuthenticated: state.user.isAuthenticated,
  token: state.user.token,
  userId: state.user.user.id,
  productId: state.product.product.id
});

export default connect(mapStateToProps, { commentOnProduct })(Comments);
