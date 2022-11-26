import { Link } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  // const viewFullscreenHandler = () => {
  //   props.onViewFullscreen(props.id);
  // };
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link
        to={`/quotes/${props.id}`}
        className="btn"
        // onClick={viewFullscreenHandler}
      >
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
