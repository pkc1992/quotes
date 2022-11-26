import { useEffect, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();

  const route = useRouteMatch();
  const { qId } = route.params;

  const { sendRequest, data, status, error } = useHttp(addComment);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    sendRequest(
      {
        quoteId: qId,
        commentData: { text: commentTextRef.current.value },
      },
      true
    );
  };

  const { onAddComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      // const { commentId } = data;
      // props.onAddComment({ id: commentId, text: commentTextRef.current.value });
      onAddComment();
    }
  }, [status, error, onAddComment]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && <LoadingSpinner />}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
