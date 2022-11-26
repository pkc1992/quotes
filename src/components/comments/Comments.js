import { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./Comments.module.css";
import CommentsList from "./CommentsList";
import NewCommentForm from "./NewCommentForm";

const Comments = () => {
  const route = useRouteMatch();
  const { qId } = route.params;

  const [isAddingComment, setIsAddingComment] = useState(false);

  const { sendRequest, data, status, error } = useHttp(getAllComments);
  // const [comments, setComments] = useState(null);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    // setComments((prev) => [...prev, newComment]);
    sendRequest(qId);
  }, [qId, sendRequest]);

  useEffect(() => {
    sendRequest(qId);
  }, [qId, sendRequest]);

  // useEffect(() => {
  //   if (status === "completed" && !error) setComments(data);
  // }, [status, data, error]);

  let comments;

  if (status === "pending")
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (status === "completed" && data && data.length > 0)
    comments = <CommentsList comments={data} />;

  if (error) comments = <p>Failed to fetch comments!</p>;

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} />}
      <p>Comments...</p>
      {comments}
    </section>
  );
};

export default Comments;
