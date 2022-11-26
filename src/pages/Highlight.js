import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const Highlight = (props) => {
  const match = useRouteMatch();
  console.log(match);
  const { qId } = useParams();
  // const quote = props.onFindQuote(qId);

  const { sendRequest, data, status, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(qId);
  }, [qId, sendRequest]);

  // if (!quote) return <NoQuotesFound />;

  if (status === "pending")
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );

  if (error) return <p className="centered focuses">{error}</p>;

  if (!data.text) return <p>No quote found.</p>;

  return (
    <>
      <HighlightedQuote text={data.text} author={data.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default Highlight;
