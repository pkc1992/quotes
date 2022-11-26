// import { useParams } from "react-router-dom";
import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  // const { qId } = useParams();
  // const quote = props.onFindQuote(qId);

  return (
    <figure className={classes.quote}>
      <p>{props.text}</p>
      <figcaption>{props.author}</figcaption>
    </figure>
  );
};

export default HighlightedQuote;
